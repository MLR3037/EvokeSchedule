import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { authService } from './services/AuthService';        // ← ADD THIS
import { graphService } from './services/GraphService';
// =============================================================================
// SESSION TYPES AND CONSTANTS
// =============================================================================

const SESSION_TYPES = {
  'AM Session (8:45-11:30)': '8:45-11:30',
  'AM Session (8:45-12:00)': '8:45-12:00',
  'Lunch 1 (11:30-12:00)': '11:30-12:00',
  'Lunch 2 (12:00-12:30)': '12:00-12:30',
  'Extended Lunch Coverage (11:30-12:30)': '11:30-12:30',
  'PM (12:00-15:00)': '12:00-15:00',
  'PM (12:30-15:00)': '12:30-15:00'
};

const STAFF_PRIORITY = ['RBT', 'BS', 'BCBA', 'EA', 'CC', 'Director'];
const PRIMARY_STUDENTS = new Set([
  'ADA','ALEJANDRO','ASEN','AUSTIN','CALEB','CHARLES','ELIJAH','GABE','ISAAC','JOSEPH','JOSEPHINE','JUSTIN','LEVI','LOGAN','LYDIA','MATEO','MICHAEL','PETER','ROMAN','WENZDAY','REMI','KYMANI','ARIAN','VINNY','BAO','ADRIAN','CESAR','JAY','ELIAS','MILO'
]);

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getProgramForStudent(student) {
  // Use the program field if available, otherwise fall back to the hardcoded list for existing students
  return student.program || (PRIMARY_STUDENTS.has(student.name.toUpperCase()) ? 'Primary/EI' : 'Secondary/Transition');
}

// =============================================================================
// ADD STAFF MODAL
// =============================================================================

const AddStaffModal = ({ show, onClose, onAddStaff }) => {
  const [staffData, setStaffData] = useState({
    name: '',
    role: 'RBT',
    available: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staffData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddStaff(staffData);
      setStaffData({ name: '', role: 'RBT', available: true });
      onClose();
    } catch (error) {
      console.error('Failed to add staff:', error);
      alert('Failed to add staff: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl border w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Add New Staff Member</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">×</button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
            <input
              type="text"
              value={staffData.name}
              onChange={(e) => setStaffData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter staff name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={staffData.role}
              onChange={(e) => setStaffData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="RBT">RBT</option>
              <option value="BS">BS</option>
              <option value="BCBA">BCBA</option>
              <option value="EA">EA</option>
              <option value="MHA">MHA</option>
              <option value="CC">CC</option>
              <option value="Teacher">Teacher</option>
              <option value="Director">Director</option>
              <option value="Clinical Trainer">Clinical Trainer</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={staffData.available}
                onChange={(e) => setStaffData(prev => ({ ...prev, available: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Available for scheduling</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={isSubmitting || !staffData.name.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add Staff'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ADD CLIENT MODAL
// =============================================================================

const AddClientModal = ({ show, onClose, onAddClient, availableStaff }) => {
  const [clientData, setClientData] = useState({
    name: '',
    program: 'Primary/EI',
    ratio: '1:1',
    amRatio: '1:1',
    pmRatio: '1:1',
    lunchSchedule: 'First',
    requiresLunch1to1: false,
    teamStaff: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddClient(clientData);
      setClientData({
        name: '',
        program: 'Primary/EI',
        ratio: '1:1',
        amRatio: '1:1',
        pmRatio: '1:1',
        lunchSchedule: 'First',
        requiresLunch1to1: false,
        teamStaff: []
      });
      onClose();
    } catch (error) {
      console.error('Failed to add client:', error);
      alert('Failed to add client: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStaffMember = (staffName) => {
    setClientData(prev => ({
      ...prev,
      teamStaff: prev.teamStaff.includes(staffName)
        ? prev.teamStaff.filter(name => name !== staffName)
        : [...prev.teamStaff, staffName]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl border w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Add New Client</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">×</button>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
            <input
              type="text"
              value={clientData.name}
              onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
            <select
              value={clientData.program}
              onChange={(e) => setClientData(prev => ({ ...prev, program: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Primary/EI">Primary/EI</option>
              <option value="Secondary/Transition">Secondary/Transition</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Ratio</label>
              <select
                value={clientData.ratio}
                onChange={(e) => setClientData(prev => ({ ...prev, ratio: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1:1">1:1</option>
                <option value="1:2">1:2</option>
                <option value="2:1">2:1</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AM Session Ratio</label>
              <select
                value={clientData.amRatio}
                onChange={(e) => setClientData(prev => ({ ...prev, amRatio: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1:1">1:1</option>
                <option value="1:2">1:2</option>
                <option value="2:1">2:1</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PM Session Ratio</label>
              <select
                value={clientData.pmRatio}
                onChange={(e) => setClientData(prev => ({ ...prev, pmRatio: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1:1">1:1</option>
                <option value="1:2">1:2</option>
                <option value="2:1">2:1</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lunch Schedule</label>
              <select
                value={clientData.lunchSchedule}
                onChange={(e) => setClientData(prev => ({ ...prev, lunchSchedule: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="First">First (11:30-12:00)</option>
                <option value="Second">Second (12:00-12:30)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={clientData.requiresLunch1to1}
                  onChange={(e) => setClientData(prev => ({ ...prev, requiresLunch1to1: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Requires 1:1 lunch supervision</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Staff ({clientData.teamStaff.length} selected)
            </label>
            <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {availableStaff.map(staff => (
                  <label key={staff.id} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={clientData.teamStaff.includes(staff.name)}
                      onChange={() => toggleStaffMember(staff.name)}
                      className="mr-2"
                    />
                    <span>{staff.name} ({staff.role})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={isSubmitting || !clientData.name.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add Client'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// EXISTING MODALS (Staff, Teams, Attendance, Variety Tracker)
// =============================================================================

const StaffModal = ({ show, onClose, staff, onToggleAvailability, selectedDate, getStaffAttendance, updateStaffAttendance }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  if (!show) return null;

  const attendanceOptions = [
    { value: 'present', label: 'Present', color: 'text-green-700' },
    { value: 'absent_am', label: 'Absent AM', color: 'text-orange-700' },
    { value: 'absent_pm', label: 'Absent PM', color: 'text-orange-700' },
    { value: 'absent_full', label: 'Absent Full Day', color: 'text-red-700' }
  ];

  // Filter and sort staff alphabetically
  const filteredStaff = staff
    .filter(staffMember => 
      staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // More precise role matching - only match complete words
      (searchTerm.trim() && staffMember.role.toLowerCase().split(' ').some(word => 
        word.startsWith(searchTerm.toLowerCase())
      ))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border w-full max-w-6xl"
        style={{ height: '85vh', maxHeight: '700px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Staff Attendance - {selectedDate}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4 border-b">
          <input
            type="text"
            placeholder="Search staff by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div 
          className="px-6 py-4 overflow-y-scroll"
          style={{ 
            height: 'calc(85vh - 180px)', 
            maxHeight: 'calc(700px - 180px)'
          }}
        >
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Staff Summary ({filteredStaff.length} of {staff.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-white p-2 rounded border">
                <span className="font-medium">Total:</span> {staff.length}
              </div>
              <div className="bg-white p-2 rounded border">
                <span className="font-medium text-purple-700">BCBA:</span> {staff.filter(s => s.role === 'BCBA').length}
              </div>
              <div className="bg-white p-2 rounded border">
                <span className="font-medium text-blue-700">BS:</span> {staff.filter(s => s.role === 'BS').length}
              </div>
              <div className="bg-white p-2 rounded border">
                <span className="font-medium text-green-700">RBT:</span> {staff.filter(s => s.role === 'RBT').length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredStaff.map(staffMember => {
              const attendance = getStaffAttendance(staffMember.id, selectedDate);
              const currentOption = attendanceOptions.find(opt => opt.value === attendance);

              return (
                <div key={staffMember.id} className="bg-white border-2 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900">{staffMember.name}</h4>
                    <p className="text-sm text-gray-600">{staffMember.role}</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Attendance for {selectedDate}:
                    </label>
                    <div className="space-y-1">
                      {attendanceOptions.map(option => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name={`attendance-${staffMember.id}`}
                            value={option.value}
                            checked={attendance === option.value}
                            onChange={() => updateStaffAttendance(staffMember.id, selectedDate, option.value)}
                            className="mr-2"
                          />
                          <span className={`text-xs ${option.color}`}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">Manage daily staff attendance</p>
          <button 
            onClick={onClose}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamModal = ({ show, onClose, students, staff, onUpdateTeamStaff }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border w-full max-w-6xl"
        style={{ height: '85vh', maxHeight: '700px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Manage Student Teams</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div 
          className="px-6 py-4 overflow-y-scroll"
          style={{ 
            height: 'calc(85vh - 140px)', 
            maxHeight: 'calc(700px - 140px)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {students
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(student => (
              <div key={student.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="mb-3">
                  <h4 className="font-semibold text-lg text-gray-800">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.ratio} • {student.lunchSchedule} Lunch</p>
                </div>
                
                <div className="mb-3">
                  <p className="font-medium text-sm text-gray-700 mb-2">Current Team ({student.teamStaff?.length || 0} staff):</p>
                  <div className="flex flex-wrap gap-1 min-h-[2rem]">
                    {(student.teamStaff || []).map(staffName => (
                      <span 
                        key={staffName}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                      >
                        {staffName}
                        <button
                          onClick={() => onUpdateTeamStaff(student.id, staffName, 'remove')}
                          className="hover:bg-blue-200 rounded px-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(!student.teamStaff || student.teamStaff.length === 0) && (
                      <span className="text-gray-400 text-sm italic">No team members assigned</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="font-medium text-sm text-gray-700 mb-2">Add Staff ({staff.filter(s => s.available && !(student.teamStaff || []).includes(s.name)).length} available):</p>
                  <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                    {staff
                      .filter(s => s.available && !(student.teamStaff || []).includes(s.name))
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(staffMember => (
                      <button
                        key={staffMember.id}
                        onClick={() => onUpdateTeamStaff(student.id, staffMember.name, 'add')}
                        className="text-left px-2 py-1 text-xs bg-gray-100 hover:bg-green-100 border rounded transition-colors"
                      >
                        {staffMember.role} {staffMember.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">Changes automatically saved to SharePoint</p>
          <button 
            onClick={onClose}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const AttendanceModal = ({ show, onClose, students, selectedDate, getStudentAttendance, updateStudentAttendance }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  if (!show) return null;

  // Filter and sort students alphabetically
  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border w-full max-w-6xl"
        style={{ height: '85vh', maxHeight: '700px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Student Attendance - {selectedDate}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4 border-b">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="px-6 py-4 overflow-y-scroll" style={{ height: 'calc(85vh - 180px)', maxHeight: 'calc(700px - 180px)' }}>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Attendance Options ({filteredStudents.length} of {students.length})</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div><strong>Present:</strong> Student will attend both AM and PM sessions</div>
              <div><strong>AM Out:</strong> Student absent for AM session only</div>
              <div><strong>PM Out:</strong> Student absent for PM session only</div>
              <div><strong>Full Day Absent:</strong> Student will not attend any sessions</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map(student => {
              const currentAttendance = getStudentAttendance(student.id, selectedDate);
              
              return (
                <div key={student.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="mb-3">
                    <h4 className="font-semibold text-lg text-gray-800">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.ratio} • {student.lunchSchedule} Lunch</p>
                  </div>
                  
                  <div className="space-y-2">
                    {['present', 'absent_am', 'absent_pm', 'absent_full'].map(status => {
                      const labels = {
                        present: 'Present',
                        absent_am: 'AM Out',
                        absent_pm: 'PM Out',
                        absent_full: 'Full Day Absent'
                      };
                      const colors = {
                        present: 'text-green-700',
                        absent_am: 'text-orange-700',
                        absent_pm: 'text-orange-700',
                        absent_full: 'text-red-700'
                      };
                      
                      return (
                        <label key={status} className="block">
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value={status}
                            checked={currentAttendance === status}
                            onChange={() => updateStudentAttendance(student.id, selectedDate, status)}
                            className="mr-2"
                          />
                          <span className={`${colors[status]} font-medium`}>{labels[status]}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">Changes automatically saved • Rerun Auto-Assign after attendance changes</p>
          <button 
            onClick={onClose}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const VarietyTrackerModal = ({ show, onClose, students, staff, getRecentAssignments, getVarietyScore, selectedDate, rawAssignmentHistory = [] }) => {
  const [showHistoryTable, setShowHistoryTable] = useState(false);

  if (!show) return null;

  // Helper function to get staff name by ID
  const getStaffNameById = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? `${staffMember.role} ${staffMember.name}` : `Unknown Staff (ID: ${staffId})`;
  };

  // Helper function to get student name by ID  
  const getStudentNameById = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : `Unknown Student (ID: ${studentId})`;
  };

  // Sort history by date (most recent first)
  const sortedHistory = rawAssignmentHistory
    .filter(h => h.isFinal)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border w-full max-w-7xl"
        style={{ height: '90vh', maxHeight: '800px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold">Assignment History & Variety Tracking</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistoryTable(false)}
                className={`px-3 py-1 rounded text-sm ${!showHistoryTable ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Variety Scores
              </button>
              <button
                onClick={() => setShowHistoryTable(true)}
                className={`px-3 py-1 rounded text-sm ${showHistoryTable ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                History Table
              </button>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4 overflow-y-scroll" style={{ height: 'calc(90vh - 140px)', maxHeight: 'calc(800px - 140px)' }}>
          {!showHistoryTable ? (
            <>
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">How Variety Tracking Works</h4>
                <div className="text-sm text-purple-700 space-y-1">
                  <div><strong>Variety Score:</strong> Higher scores = less recent work with student</div>
                  <div><strong>100 points:</strong> Never worked with student before</div>
                  <div><strong>10 points per day:</strong> Added for each day since last assignment</div>
                  <div><strong>-5 points each:</strong> Penalty for each of last 5 assignments with student</div>
                  <div><strong>Green = High variety, Yellow = Medium, Red = Low variety</strong></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {students.map(student => {
                  const teamStaff = staff.filter(s => (student.teamStaff || []).includes(s.name) && s.available);
                  
                  return (
                    <div key={student.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="mb-4">
                        <h4 className="font-semibold text-lg text-gray-800">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.ratio} • {student.lunchSchedule} Lunch • Team: {student.teamStaff?.length || 0} staff</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {teamStaff.map(staffMember => {
                          const recentAssignments = getRecentAssignments(student.id, staffMember.id);
                          const varietyScore = getVarietyScore(student.id, staffMember.id, selectedDate);
                      
                          let varietyColor = 'bg-green-100 text-green-800 border-green-200';
                          if (varietyScore < 30) varietyColor = 'bg-red-100 text-red-800 border-red-200';
                          else if (varietyScore < 60) varietyColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
                          
                          return (
                            <div key={staffMember.id} className={`border rounded-lg p-3 ${varietyColor}`}>
                              <div className="font-medium text-sm">{staffMember.role} {staffMember.name}</div>
                              <div className="text-xs mt-1">
                                <div>Variety Score: <strong>{Math.round(varietyScore)}</strong></div>
                                <div>Recent assignments: <strong>{recentAssignments.length}</strong></div>
                                {recentAssignments.length > 0 && (
                                  <div className="mt-1 text-xs opacity-75">
                                    Last: {recentAssignments[0]}
                                    {recentAssignments.length > 1 && (
                                      <div>Previous: {recentAssignments.slice(1, 3).join(', ')}</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Finalized Assignment History</h4>
                <p className="text-sm text-blue-700">This shows all finalized schedules that count toward variety tracking.</p>
              </div>
              
              {sortedHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Student Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Student ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Staff Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Staff ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Session Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedHistory.map((assignment, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">{assignment.date}</td>
                          <td className="border border-gray-300 px-4 py-2">{getStudentNameById(assignment.studentId)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-xs text-gray-600">{assignment.studentId}</td>
                          <td className="border border-gray-300 px-4 py-2">{getStaffNameById(assignment.staffId)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-xs text-gray-600">{assignment.staffId}</td>
                          <td className="border border-gray-300 px-4 py-2">{assignment.sessionType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No finalized assignment history found.</p>
                  <p className="text-sm mt-2">Use the "Finalize Schedule" button to save official schedules.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">
            {showHistoryTable ? 'Finalized assignments from SharePoint' : 'Staff with higher variety scores will be preferred during assignment'}
          </p>
          <button 
            onClick={onClose}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ANALYSIS MODAL - FIXED VERSION
// =============================================================================

const AnalysisModal = ({ show, onClose, analysis, selectedDate }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl border w-full max-w-5xl"
        style={{ height: '85vh', maxHeight: '700px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h3 className="text-xl font-semibold">Schedule Analysis - {selectedDate}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4 overflow-y-scroll" style={{ height: 'calc(85vh - 140px)', maxHeight: 'calc(700px - 140px)' }}>
          {analysis && (
            <div className="space-y-6">
              {/* Session Utilization */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">Session Utilization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">AM Sessions (8:45-11:30/12:00)</div>
                    <div className="text-lg font-semibold text-blue-700">
                      {analysis.amUtilization}% Utilized
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">PM Sessions (12:00/12:30-15:00)</div>
                    <div className="text-lg font-semibold text-blue-700">
                      {analysis.pmUtilization}% Utilized
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Distribution - FIXED VERSION */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Sessions per Role</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-700 mb-2">AM Sessions by Role</h5>
                    <div className="text-sm space-y-1">
                      {analysis.amRoleDistribution && Object.keys(analysis.amRoleDistribution).length > 0 ? (
                        Object.entries(analysis.amRoleDistribution).map(([role, count]) => (
                          <div key={role}>{role}: {count}</div>
                        ))
                      ) : (
                        <div className="text-gray-500">No AM assignments</div>
                      )}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-gray-700 mb-2">PM Sessions by Role</h5>
                    <div className="text-sm space-y-1">
                      {analysis.pmRoleDistribution && Object.keys(analysis.pmRoleDistribution).length > 0 ? (
                        Object.entries(analysis.pmRoleDistribution).map(([role, count]) => (
                          <div key={role}>{role}: {count}</div>
                        ))
                      ) : (
                        <div className="text-gray-500">No PM assignments</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Unassigned Staff */}
              {analysis.unassignedStaff && analysis.unassignedStaff.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-3">
                    Unassigned Staff ({analysis.unassignedStaff.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {analysis.unassignedStaff.map(staff => (
                      <div key={staff.id} className="bg-white p-2 rounded border text-sm">
                        <span className="font-medium">{staff.role}</span> {staff.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule Issues */}
              {analysis.issues && analysis.issues.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">
                    Schedule Issues ({analysis.issues.length})
                  </h4>
                  <div className="space-y-2">
                    {analysis.issues.map((issue, index) => (
                      <div key={index} className="bg-white p-3 rounded border border-red-100">
                        <div className="font-medium text-red-700">{issue.type}</div>
                        <div className="text-sm text-red-600">{issue.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
          <button 
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors font-medium"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN SCHEDULER COMPONENT
// =============================================================================

const ABAScheduler = () => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStatus, setAuthStatus] = useState('Initializing...');
  const [authError, setAuthError] = useState(null);

  // Data states (now loaded from SharePoint)
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [lockedAssignments, setLockedAssignments] = useState({});
  const [studentAttendance, setStudentAttendance] = useState({});
  const [staffAttendance, setStaffAttendance] = useState({});
  const [scheduleAnalysis, setScheduleAnalysis] = useState(null);
  const [assignmentHistory, setAssignmentHistory] = useState({});
  const [rawAssignmentHistory, setRawAssignmentHistory] = useState([]); // Raw SharePoint data with IDs

  // UI states  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAttendanceManager, setShowAttendanceManager] = useState(false);
  const [showStaffManager, setShowStaffManager] = useState(false);
  const [showTeamManager, setShowTeamManager] = useState(false);
  const [showVarietyTracker, setShowVarietyTracker] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [expandedTeams, setExpandedTeams] = useState(new Set());

  // Initialize authentication and load data
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setAuthStatus('Checking authentication...');
      setAuthError(null);
      
      const isSignedIn = await authService.initialize();
      
      if (isSignedIn) {
        setAuthStatus('Initializing Microsoft Graph...');
        await graphService.initialize();
        setIsAuthenticated(true);
        await loadDataFromSharePoint();
        setAuthStatus('Ready');
      } else {
        setAuthStatus('Please sign in to continue');
      }
    } catch (error) {
      console.error('App initialization error:', error);
      setAuthError(`Initialization failed: ${error.message}`);
      setAuthStatus('Using offline mode with sample data');
      
      // Fallback to sample data if services fail
      setIsAuthenticated(true);
      setStaff([
        { id: '1', name: 'John Smith', role: 'RBT', available: true },
        { id: '2', name: 'Sarah Johnson', role: 'BS', available: true },
        { id: '3', name: 'Mike Davis', role: 'BCBA', available: true },
        { id: '4', name: 'Lisa Brown', role: 'RBT', available: true }
      ]);
      setStudents([
        { id: '1', name: 'Alex', ratio: '1:1', lunchSchedule: 'First', requiresLunch1to1: true, teamStaff: ['John Smith', 'Sarah Johnson'] },
        { id: '2', name: 'Emma', ratio: '2:1', lunchSchedule: 'Second', requiresLunch1to1: false, teamStaff: ['Mike Davis', 'John Smith', 'Lisa Brown'] }
      ]);
    }
  };

  const handleSignIn = async () => {
    try {
      setAuthStatus('Signing in...');
      setAuthError(null);
      
      const success = await authService.signIn();
      if (success) {
        await graphService.initialize();
        setIsAuthenticated(true);
        await loadDataFromSharePoint();
        setAuthStatus('Ready');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setAuthError(error.message);
      setAuthStatus('Sign-in failed');
    }
  };

  const loadDataFromSharePoint = async () => {
    try {
      setAuthStatus('Loading data from SharePoint...');
      
      const [staffData, clientData, historyData] = await Promise.all([
        graphService.getAllStaff(),
        graphService.getAllClients(),
        graphService.getAssignmentHistory()
      ]);
      
      setStaff(staffData);
      setStudents(clientData);
      
      // Store raw history data for display
      setRawAssignmentHistory(historyData);
      
      // Process history data into the format expected by the app
      const processedHistory = {};
      historyData.filter(h => h.isFinal).forEach(assignment => {
        const key = `${assignment.studentId}-${assignment.staffId}`;
        if (!processedHistory[key]) {
          processedHistory[key] = [];
        }
        processedHistory[key].push(assignment.date);
      });
      setAssignmentHistory(processedHistory);
      
      setAuthStatus(`Data loaded: ${staffData.length} staff, ${clientData.length} students, ${historyData.length} history entries`);
    } catch (error) {
      console.error('Failed to load data:', error);
      setAuthError('Failed to load data: ' + error.message);
    }
  };

  const handleAddStaff = async (staffData) => {
    const newStaff = await graphService.createStaff(staffData);
    setStaff(prev => [...prev, newStaff]);
  };

  const handleAddClient = async (clientData) => {
    const newClient = await graphService.createClient(clientData);
    setStudents(prev => [...prev, newClient]);
  };

  const toggleStaffAvailability = async (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    if (!staffMember) return;

    const newAvailability = !staffMember.available;
    
    try {
      await graphService.updateStaffAvailability(staffId, newAvailability);
      setStaff(prev => prev.map(member => 
        member.id === staffId 
          ? { ...member, available: newAvailability }
          : member
      ));
    } catch (error) {
      console.error('Failed to update staff availability:', error);
      alert('Failed to update availability: ' + error.message);
    }
  };

  const updateTeamStaff = async (studentId, staffName, action) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    let newTeamStaff;
    if (action === 'add' && !(student.teamStaff || []).includes(staffName)) {
      newTeamStaff = [...(student.teamStaff || []), staffName];
    } else if (action === 'remove') {
      newTeamStaff = (student.teamStaff || []).filter(name => name !== staffName);
    } else {
      return;
    }

    try {
      await graphService.updateClientTeams(studentId, newTeamStaff);
      setStudents(prev => prev.map(s => 
        s.id === studentId 
          ? { ...s, teamStaff: newTeamStaff }
          : s
      ));
    } catch (error) {
      console.error('Failed to update team staff:', error);
      alert('Failed to update team: ' + error.message);
    }
  };

  // Utility functions
  const getStaffByName = (name) => staff.find(s => s.name === name);
  const getSessionsForDate = () => schedule.filter(s => s.date === selectedDate);
  const getStudentAttendance = (studentId, date) => studentAttendance[`${studentId}-${date}`] || 'present';
  const isStudentAbsent = (student, session) => {
    const attendance = getStudentAttendance(student.id, selectedDate);
    if (attendance === 'absent_full') return true;
    if (session === 'AM' && attendance === 'absent_am') return true;
    if (session === 'PM' && attendance === 'absent_pm') return true;
    return false;
  };

  const updateStudentAttendance = (studentId, date, status) => {
    setStudentAttendance(prev => ({
      ...prev,
      [`${studentId}-${date}`]: status
    }));
  };

  // Staff attendance functions
  const getStaffAttendance = (staffId, date) => {
    return staffAttendance[`${staffId}-${date}`] || 'present';
  };

  const isStaffAbsent = (staffMember, session) => {
    const attendance = getStaffAttendance(staffMember.id, selectedDate);
    if (attendance === 'absent_full') return true;
    if (session === 'AM' && attendance === 'absent_am') return true;
    if (session === 'PM' && attendance === 'absent_pm') return true;
    return false;
  };

  const updateStaffAttendance = (staffId, date, status) => {
    setStaffAttendance(prev => ({
      ...prev,
      [`${staffId}-${date}`]: status
    }));
  };

  // Manual assignment function for 2:1 ratios
  const handleManual2to1Assignment = (studentId, sessionType, staffId, position) => {
    if (!staffId) return;
    
    const student = students.find(s => s.id === studentId);
    const staffMember = staff.find(s => s.id === staffId);
    
    if (!student || !staffMember) return;
    
    // Check if staff is on student's team for AM/PM sessions
    if ((sessionType === 'AM' || sessionType === 'PM') && student.teamStaff && !student.teamStaff.includes(staffMember.name)) {
      alert(`${staffMember.role} ${staffMember.name} is not on ${student.name}'s team and cannot be assigned to AM/PM sessions.`);
      return;
    }

    // Get current sessions for this student and session type
    const currentSessions = schedule.filter(s => 
      s.studentId === studentId && 
      s.sessionType.includes(sessionType) && 
      s.date === selectedDate
    );

    // Remove existing assignment at this position if it exists
    let filteredSchedule = schedule.filter(s => 
      !(s.studentId === studentId && 
        s.sessionType.includes(sessionType) && 
        s.date === selectedDate &&
        s.position === position)
    );

    // Check if staff is already assigned to this student in the other position
    const otherPositionSession = currentSessions.find(s => 
      s.staffId === staffId && s.position !== position
    );
    
    if (otherPositionSession) {
      alert(`${staffMember.role} ${staffMember.name} is already assigned to ${student.name} as Staff ${otherPositionSession.position === 1 ? '1' : '2'}.`);
      return;
    }

    // Create new assignment
    const newSession = {
      id: Date.now() + Math.random(),
      studentId: studentId,
      staffId: staffId,
      sessionType: getSessionTypeForStudent(student, sessionType),
      date: selectedDate,
      time: SESSION_TYPES[getSessionTypeForStudent(student, sessionType)],
      isManual: true,
      position: position // 1 or 2 for 2:1 assignments
    };
    
    const newSchedule = [...filteredSchedule, newSession];
    setSchedule(newSchedule);
    addAssignmentToHistory(studentId, staffId, selectedDate);
    
    // Immediately update analysis to reflect manual assignment
    const analysis = generateAnalysis(newSchedule);
    setScheduleAnalysis(analysis);
    
    console.log(`Manual 2:1 assignment: ${staffMember.role} ${staffMember.name} to ${student.name} - ${sessionType} (Position ${position})`);
  };

  // Manual assignment function
  const handleManualAssignment = (studentId, sessionType, staffId) => {
    if (!staffId) return;
    
    const student = students.find(s => s.id === studentId);
    const staffMember = staff.find(s => s.id === staffId);
    
    if (!student || !staffMember) return;
    
    // Check if staff is on student's team for AM/PM sessions
    if ((sessionType === 'AM' || sessionType === 'PM') && student.teamStaff && !student.teamStaff.includes(staffMember.name)) {
      alert(`${staffMember.role} ${staffMember.name} is not on ${student.name}'s team and cannot be assigned to AM/PM sessions.`);
      return;
    }
    
    // Remove existing assignment for this student and session type
    const filteredSchedule = schedule.filter(s => 
      !(s.studentId === studentId && s.sessionType.includes(sessionType) && s.date === selectedDate)
    );
    
    // Create new assignment
    const newSession = {
      id: Date.now() + Math.random(),
      studentId: studentId,
      staffId: staffId,
      sessionType: getSessionTypeForStudent(student, sessionType),
      date: selectedDate,
      time: SESSION_TYPES[getSessionTypeForStudent(student, sessionType)],
      isManual: true
    };
    
    const newSchedule = [...filteredSchedule, newSession];
    setSchedule(newSchedule);
    addAssignmentToHistory(studentId, staffId, selectedDate);
    
    // Immediately update analysis to reflect manual assignment
    const analysis = generateAnalysis(newSchedule);
    setScheduleAnalysis(analysis);
    
    console.log(`Manual assignment: ${staffMember.role} ${staffMember.name} to ${student.name} - ${sessionType}`);
  };
  
  const getSessionTypeForStudent = (student, sessionType) => {
    if (sessionType === 'AM') {
      return student.lunchSchedule === 'First' ? 'AM Session (8:45-11:30)' : 'AM Session (8:45-12:00)';
    } else if (sessionType === 'PM') {
      return student.lunchSchedule === 'First' ? 'PM (12:00-15:00)' : 'PM (12:30-15:00)';
    } else if (sessionType === 'LUNCH1') {
      return 'Lunch 1 (11:30-12:00)';
    } else if (sessionType === 'LUNCH2') {
      return 'Lunch 2 (12:00-12:30)';
    }
    return sessionType;
  };

  const handleLockAssignment = (studentId, sessionType, staffId) => {
    setLockedAssignments(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [sessionType]: staffId
      }
    }));
  };

  // Variety tracking functions
  const getAssignmentHistoryKey = (studentId, staffId) => `${studentId}-${staffId}`;

  const getRecentAssignments = (studentId, staffId) => {
    const key = getAssignmentHistoryKey(studentId, staffId);
    return assignmentHistory[key] || [];
  };

  const addAssignmentToHistory = (studentId, staffId, date) => {
    const key = getAssignmentHistoryKey(studentId, staffId);
    setAssignmentHistory(prev => {
      const currentHistory = prev[key] || [];
      const newHistory = [date, ...currentHistory.filter(d => d !== date)].slice(0, 5);
      return {
        ...prev,
        [key]: newHistory
      };
    });
  };

  const getVarietyScore = (studentId, staffId, selectedDate) => {
    const recentAssignments = getRecentAssignments(studentId, staffId);
    if (recentAssignments.length === 0) return 100;
    
    const lastAssignment = recentAssignments[0];
    const daysSinceAssignment = Math.abs(new Date(selectedDate) - new Date(lastAssignment)) / (1000 * 60 * 60 * 24);
    
    let varietyScore = Math.min(100, daysSinceAssignment * 10);
    varietyScore -= recentAssignments.length * 5;
    
    return Math.max(0, varietyScore);
  };

  // Assignment algorithm with SharePoint integration
  const generateSchedule = () => {
    console.log('Starting Auto-Assignment with SharePoint data...');
    const newSchedule = [];
    const staffUsage = {};
    const studentStaffPairings = {}; // Track which staff work with which students to prevent all-day assignments
    
    staff.forEach(member => {
      staffUsage[member.id] = { am: false, pm: false, sessions: 0, lunchCoverage: 0 };
    });

    // PHASE 0: Process locked assignments first
    console.log('Phase 0: Processing locked assignments...');
    students.forEach(student => {
      const lock = lockedAssignments[student.id] || {};
      const amSessionType = student.lunchSchedule === 'First' ? 'AM Session (8:45-11:30)' : 'AM Session (8:45-12:00)';
      const pmSessionType = student.lunchSchedule === 'First' ? 'PM (12:00-15:00)' : 'PM (12:30-15:00)';

      // Create locked AM assignment
      if (lock.AM && !isStudentAbsent(student, 'AM')) {
        const staffMember = staff.find(s => s.id === lock.AM);
        if (staffMember && staffMember.available) {
          const amSession = {
            id: Date.now() + Math.random(),
            studentId: student.id,
            staffId: lock.AM,
            sessionType: amSessionType,
            date: selectedDate,
            time: SESSION_TYPES[amSessionType],
            isLocked: true
          };
          newSchedule.push(amSession);
          staffUsage[lock.AM].am = true;
          staffUsage[lock.AM].sessions += 1;
          studentStaffPairings[`${student.id}-${lock.AM}`] = true;
          addAssignmentToHistory(student.id, lock.AM, selectedDate);
          console.log(`LOCKED: ${staffMember.role} ${staffMember.name} to ${student.name} - AM`);
        }
      }

      // Create locked PM assignment
      if (lock.PM && !isStudentAbsent(student, 'PM')) {
        const staffMember = staff.find(s => s.id === lock.PM);
        if (staffMember && staffMember.available) {
          const pmSession = {
            id: Date.now() + Math.random(),
            studentId: student.id,
            staffId: lock.PM,
            sessionType: pmSessionType,
            date: selectedDate,
            time: SESSION_TYPES[pmSessionType],
            isLocked: true
          };
          newSchedule.push(pmSession);
          staffUsage[lock.PM].pm = true;
          staffUsage[lock.PM].sessions += 1;
          studentStaffPairings[`${student.id}-${lock.PM}`] = true;
          addAssignmentToHistory(student.id, lock.PM, selectedDate);
          console.log(`LOCKED: ${staffMember.role} ${staffMember.name} to ${student.name} - PM`);
        }
      }
    });

    // Build assignment queue (AM/PM sessions + lunch coverage)
    const assignmentQueue = [];
    const lunchQueue = [];
    
    students.forEach(student => {
      const lock = lockedAssignments[student.id] || {};
      const amSessionType = student.lunchSchedule === 'First' ? 'AM Session (8:45-11:30)' : 'AM Session (8:45-12:00)';
      const pmSessionType = student.lunchSchedule === 'First' ? 'PM (12:00-15:00)' : 'PM (12:30-15:00)';

      if (!lock.AM && !isStudentAbsent(student, 'AM')) {
        const amRatio = student.amRatio !== undefined ? student.amRatio : student.ratio;
        assignmentQueue.push({
          studentId: student.id,
          sessionType: amSessionType,
          assigned: false,
          requires2to1: amRatio === '2:1',
          isPaired: !!student.pairedWith,
          staffNeeded: amRatio === '2:1' ? 2 : 1
        });
      }

      if (!lock.PM && !isStudentAbsent(student, 'PM')) {
        const pmRatio = student.pmRatio !== undefined ? student.pmRatio : student.ratio;
        assignmentQueue.push({
          studentId: student.id,
          sessionType: pmSessionType,
          assigned: false,
          requires2to1: pmRatio === '2:1',
          isPaired: !!student.pairedWith,
          staffNeeded: pmRatio === '2:1' ? 2 : 1
        });
      }

      // Add lunch coverage for students needing ANY lunch supervision
      const needsLunchCoverage = student.requiresLunch1to1 || student.lunchPairing || 
        student.ratio === '2:1' || student.amRatio === '2:1' || student.pmRatio === '2:1';
      
      if (needsLunchCoverage && !isStudentAbsent(student, 'LUNCH')) {
        const lunchSessionType = student.lunchSchedule === 'First' ? 'Lunch 1 (11:30-12:00)' : 'Lunch 2 (12:00-12:30)';
        lunchQueue.push({
          studentId: student.id,
          sessionType: lunchSessionType,
          assigned: false,
          requires2to1: false,
          isPaired: false,
          staffNeeded: 1
        });
      }
      
      // Also add lunch coverage for students with "Paired Lunch" (check if property exists)
      if (student.lunchPairing && !student.requiresLunch1to1 && !isStudentAbsent(student, 'LUNCH')) {
        const lunchSessionType = student.lunchSchedule === 'First' ? 'Lunch 1 (11:30-12:00)' : 'Lunch 2 (12:00-12:30)';
        lunchQueue.push({
          studentId: student.id,
          sessionType: lunchSessionType,
          assigned: false,
          requires2to1: false,
          isPaired: true,
          staffNeeded: 1
        });
      }
    });

    // Sort assignment queue by priority
    assignmentQueue.sort((a, b) => {
      if (a.requires2to1 && !b.requires2to1) return -1;
      if (b.requires2to1 && !a.requires2to1) return 1;
      if (a.isPaired && !b.isPaired) return -1;
      if (b.isPaired && !a.isPaired) return 1;
      return 0;
    });

    // Helper function to find team RBT/BS assignments that can be reassigned
    const findReassignableTeamStaff = (targetStudent, sessionTimeSlot) => {
      const teamStaff = (targetStudent.teamStaff || [])
        .map(name => getStaffByName(name))
        .filter(member => member && ['RBT', 'BS'].includes(member.role) && member.available);
      
      const reassignableStaff = [];
      
      for (const staff of teamStaff) {
        const currentAssignments = newSchedule.filter(session => 
          session.staffId === staff.id && 
          session.date === selectedDate &&
          ((sessionTimeSlot === 'AM' && session.sessionType.includes('AM')) ||
           (sessionTimeSlot === 'PM' && session.sessionType.includes('PM')))
        );
        
        if (currentAssignments.length > 0) {
          const currentAssignment = currentAssignments[0];
          const currentStudent = students.find(s => s.id === currentAssignment.studentId);
          
          if (currentStudent) {
            reassignableStaff.push({
              staffMember: staff,
              currentAssignment: currentAssignment,
              currentStudent: currentStudent
            });
          }
        }
      }
      
      return reassignableStaff;
    };

    // Helper function to perform cascading reassignment
    const performCascadingReassignment = (targetAssignment) => {
      const targetStudent = students.find(s => s.id === targetAssignment.studentId);
      if (!targetStudent) return false;
      
      const sessionTimeSlot = targetAssignment.sessionType.includes('AM') ? 'AM' : 'PM';
      const reassignableStaff = findReassignableTeamStaff(targetStudent, sessionTimeSlot);
      
      console.log(`🔄 Attempting cascading reassignment for ${targetStudent.name} (${sessionTimeSlot})`);
      console.log(`Found ${reassignableStaff.length} reassignable team staff members`);
      
      for (const { staffMember, currentAssignment, currentStudent } of reassignableStaff) {
        console.log(`🔄 Checking if ${staffMember.name} can be moved from ${currentStudent.name} to ${targetStudent.name}`);
        
        // Check if the current student has other team options for reassignment
        const currentStudentAlternatives = (currentStudent.teamStaff || [])
          .map(name => getStaffByName(name))
          .filter(member => 
            member && 
            ['RBT', 'BS', 'BCBA'].includes(member.role) &&
            member.available &&
            member.id !== staffMember.id // Don't include the staff we're trying to move
          );
        
        // Filter alternatives that are actually available for this time slot
        const availableAlternatives = currentStudentAlternatives.filter(alt => {
          const isAM = currentAssignment.sessionType.includes('AM');
          const isPM = currentAssignment.sessionType.includes('PM');
          
          if (isAM && staffUsage[alt.id].am) return false;
          if (isPM && staffUsage[alt.id].pm) return false;
          
          // Prevent all-day assignments
          const pairingKey = `${currentStudent.id}-${alt.id}`;
          if (studentStaffPairings[pairingKey]) return false;
          
          return true;
        });
        
        console.log(`Found ${availableAlternatives.length} alternatives for ${currentStudent.name}`);
        
        if (availableAlternatives.length > 0) {
          // We can reassign! Move the staff member
          console.log(`✅ Performing cascading reassignment: Moving ${staffMember.name} from ${currentStudent.name} to ${targetStudent.name}`);
          
          // Remove the current assignment
          const sessionIndex = newSchedule.findIndex(s => s.id === currentAssignment.id);
          if (sessionIndex >= 0) {
            newSchedule.splice(sessionIndex, 1);
            
            // Update staff usage - free up the staff member
            const isAM = currentAssignment.sessionType.includes('AM');
            const isPM = currentAssignment.sessionType.includes('PM');
            if (isAM) staffUsage[staffMember.id].am = false;
            if (isPM) staffUsage[staffMember.id].pm = false;
            staffUsage[staffMember.id].sessions -= 1;
            
            // Remove the student-staff pairing
            const oldPairingKey = `${currentStudent.id}-${staffMember.id}`;
            delete studentStaffPairings[oldPairingKey];
          }
          
          // Choose the best alternative (prefer RBT/BS over BCBA, use variety scoring)
          availableAlternatives.sort((a, b) => {
            // Prefer RBT/BS over BCBA for current student
            const aIsRBTBS = ['RBT', 'BS'].includes(a.role);
            const bIsRBTBS = ['RBT', 'BS'].includes(b.role);
            
            if (aIsRBTBS !== bIsRBTBS) {
              return aIsRBTBS ? -1 : 1;
            }
            
            // Use variety scoring
            const aVarietyScore = getVarietyScore(currentStudent.id, a.id, selectedDate);
            const bVarietyScore = getVarietyScore(currentStudent.id, b.id, selectedDate);
            return bVarietyScore - aVarietyScore;
          });
          
          const alternativeStaff = availableAlternatives[0];
          
          // Create new assignment for current student with alternative staff
          const newAlternativeSession = {
            id: Date.now() + Math.random(),
            studentId: currentStudent.id,
            staffId: alternativeStaff.id,
            sessionType: currentAssignment.sessionType,
            date: selectedDate,
            time: SESSION_TYPES[currentAssignment.sessionType]
          };
          
          newSchedule.push(newAlternativeSession);
          addAssignmentToHistory(currentStudent.id, alternativeStaff.id, selectedDate);
          
          // Update staff usage for alternative staff
          const isAM = currentAssignment.sessionType.includes('AM');
          const isPM = currentAssignment.sessionType.includes('PM');
          if (isAM) staffUsage[alternativeStaff.id].am = true;
          if (isPM) staffUsage[alternativeStaff.id].pm = true;
          staffUsage[alternativeStaff.id].sessions += 1;
          
          // Track new pairing
          const newPairingKey = `${currentStudent.id}-${alternativeStaff.id}`;
          studentStaffPairings[newPairingKey] = true;
          
          console.log(`✅ Assigned alternative: ${alternativeStaff.role} ${alternativeStaff.name} to ${currentStudent.name}`);
          
          // Now assign the original staff member to the target student
          const targetSession = {
            id: Date.now() + Math.random(),
            studentId: targetStudent.id,
            staffId: staffMember.id,
            sessionType: targetAssignment.sessionType,
            date: selectedDate,
            time: SESSION_TYPES[targetAssignment.sessionType]
          };
          
          newSchedule.push(targetSession);
          addAssignmentToHistory(targetStudent.id, staffMember.id, selectedDate);
          
          // Update staff usage for moved staff
          const targetIsAM = targetAssignment.sessionType.includes('AM');
          const targetIsPM = targetAssignment.sessionType.includes('PM');
          if (targetIsAM) staffUsage[staffMember.id].am = true;
          if (targetIsPM) staffUsage[staffMember.id].pm = true;
          staffUsage[staffMember.id].sessions += 1;
          
          // Track new pairing
          const targetPairingKey = `${targetStudent.id}-${staffMember.id}`;
          studentStaffPairings[targetPairingKey] = true;
          
          console.log(`✅ Cascading complete: ${staffMember.role} ${staffMember.name} now assigned to ${targetStudent.name}`);
          
          targetAssignment.assigned = true;
          return true;
        }
      }
      
      console.log(`❌ Could not perform cascading reassignment for ${targetStudent.name} - no viable alternatives found`);
      return false;
    };

    // Multi-phase assignment algorithm with cascading reassignment
    console.log('Phase 1: Assigning TEAM RBTs and BS with cascading reassignment');
    const primaryRoles = ['RBT', 'BS'];
    
    for (let pass = 1; pass <= 5; pass++) {
      primaryRoles.forEach(roleType => {
        assignmentQueue.forEach(assignment => {
          if (assignment.assigned) return;
          
          const student = students.find(s => s.id === assignment.studentId);
          if (!student) return;

          let candidateStaff = (student.teamStaff || [])
            .map(name => getStaffByName(name))
            .filter(member => 
              member && 
              member.role === roleType &&
              member.available
            );

          candidateStaff = candidateStaff.filter(member => {
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            
            if (isAM && staffUsage[member.id].am) return false;
            if (isPM && staffUsage[member.id].pm) return false;
            
            // Staff lunch break constraint: if staff ends AM at 11:30, they can't start PM until 12:00
            if (isPM && assignment.sessionType.includes('12:00')) {
              const hasAM1130 = newSchedule.some(session => 
                session.staffId === member.id && 
                session.sessionType === 'AM Session (8:45-11:30)' && 
                session.date === selectedDate
              );
              if (hasAM1130) {
                console.log(`${member.name} needs lunch break - worked AM until 11:30, can't start PM at 12:00`);
                return false;
              }
            }
            
            // Prevent same staff from being assigned to same student all day
            const pairingKey = `${assignment.studentId}-${member.id}`;
            if (studentStaffPairings[pairingKey]) {
              console.log(`Preventing all-day assignment: ${member.name} already assigned to ${student.name}`);
              return false;
            }
            
            return true;
          });

          // Handle 2:1 assignments
          if (assignment.requires2to1 && (assignment.staffNeeded || 1) === 2) {
            if (candidateStaff.length >= 2) {
              candidateStaff.sort((a, b) => {
                const aVarietyScore = getVarietyScore(assignment.studentId, a.id, selectedDate);
                const bVarietyScore = getVarietyScore(assignment.studentId, b.id, selectedDate);
                return bVarietyScore - aVarietyScore;
              });

              const selectedStaff1 = candidateStaff[0];
              const selectedStaff2 = candidateStaff[1];
              
              assignment.assigned = true;
              
              // Create two sessions for 2:1 support
              [selectedStaff1, selectedStaff2].forEach((staffMember, index) => {
                const newSession = {
                  id: Date.now() + Math.random() + index,
                  studentId: assignment.studentId,
                  staffId: staffMember.id,
                  sessionType: assignment.sessionType,
                  date: selectedDate,
                  time: SESSION_TYPES[assignment.sessionType],
                  is2to1: true,
                  position: index + 1, // 1 or 2 for staff positions
                  partner: index === 0 ? selectedStaff2.id : selectedStaff1.id
                };
                
                newSchedule.push(newSession);
                addAssignmentToHistory(assignment.studentId, staffMember.id, selectedDate);
                
                // Track staff-student pairings
                const pairingKey = `${assignment.studentId}-${staffMember.id}`;
                studentStaffPairings[pairingKey] = true;
                
                const isAM = assignment.sessionType.includes('AM');
                const isPM = assignment.sessionType.includes('PM');
                if (isAM) staffUsage[staffMember.id].am = true;
                if (isPM) staffUsage[staffMember.id].pm = true;
                staffUsage[staffMember.id].sessions += 1;
              });
              
              console.log(`2:1 Team assignment: ${selectedStaff1.role} ${selectedStaff1.name} + ${selectedStaff2.role} ${selectedStaff2.name} to ${student.name} - ${assignment.sessionType}`);
            } else {
              // Try cascading reassignment for 2:1 assignments
              console.log(`🔄 Insufficient team staff for 2:1 assignment (${candidateStaff.length}/2 needed). Attempting cascading reassignment for ${student.name}`);
              const success = performCascadingReassignment(assignment);
              if (!success) {
                console.log(`❌ Cascading reassignment failed for 2:1 ${student.name} - ${assignment.sessionType}`);
              }
            }
          } else {
            // Handle 1:1 assignments
            if (candidateStaff.length > 0) {
              candidateStaff.sort((a, b) => {
                const aVarietyScore = getVarietyScore(assignment.studentId, a.id, selectedDate);
                const bVarietyScore = getVarietyScore(assignment.studentId, b.id, selectedDate);
                return bVarietyScore - aVarietyScore;
              });

              const selectedStaff = candidateStaff[0];
              const varietyScore = getVarietyScore(assignment.studentId, selectedStaff.id, selectedDate);
              assignment.assigned = true;
              
              const newSession = {
                id: Date.now() + Math.random(),
                studentId: assignment.studentId,
                staffId: selectedStaff.id,
                sessionType: assignment.sessionType,
                date: selectedDate,
                time: SESSION_TYPES[assignment.sessionType]
              };
              
              newSchedule.push(newSession);
              addAssignmentToHistory(assignment.studentId, selectedStaff.id, selectedDate);
              
              // Track staff-student pairings to prevent all-day assignments
              const pairingKey = `${assignment.studentId}-${selectedStaff.id}`;
              studentStaffPairings[pairingKey] = true;
              
              const isAM = assignment.sessionType.includes('AM');
              const isPM = assignment.sessionType.includes('PM');
              if (isAM) staffUsage[selectedStaff.id].am = true;
              if (isPM) staffUsage[selectedStaff.id].pm = true;
              staffUsage[selectedStaff.id].sessions += 1;
              
              console.log(`Team ${selectedStaff.role} - ${selectedStaff.name} to ${student.name} - ${assignment.sessionType} (variety: ${varietyScore})`);
            } else {
              // Try cascading reassignment for 1:1 assignments
              console.log(`🔄 No available team staff for ${student.name}. Attempting cascading reassignment...`);
              const success = performCascadingReassignment(assignment);
              if (!success) {
                console.log(`❌ Cascading reassignment failed for ${student.name} - ${assignment.sessionType}`);
              }
            }
          }
        });
      });
      
      const remainingUnassigned = assignmentQueue.filter(a => !a.assigned).length;
      if (remainingUnassigned === 0) {
        console.log(`SUCCESS: All sessions assigned using TEAM staff with cascading after pass ${pass}`);
        break;
      }
    }

    // Phase 2: BCBA fallback for unassigned sessions (team BCBAs only)
    const unassignedSessions = assignmentQueue.filter(a => !a.assigned);
    if (unassignedSessions.length > 0) {
      console.log(`Phase 2: BCBA fallback for ${unassignedSessions.length} remaining sessions (TEAM BCBAs ONLY)`);
      
      // PRIORITY SORTING: Sort unassigned sessions by priority
      unassignedSessions.sort((a, b) => {
        const studentA = students.find(s => s.id === a.studentId);
        const studentB = students.find(s => s.id === b.studentId);
        if (!studentA || !studentB) return 0;
        
        // 1. Priority: 2:1 students first
        const isAM_A = a.sessionType.includes('AM');
        const isPM_A = a.sessionType.includes('PM');
        const isAM_B = b.sessionType.includes('AM');
        const isPM_B = b.sessionType.includes('PM');
        
        const ratioA = isAM_A ? (studentA.amRatio !== undefined ? studentA.amRatio : studentA.ratio) :
                      isPM_A ? (studentA.pmRatio !== undefined ? studentA.pmRatio : studentA.ratio) :
                      studentA.ratio;
        const ratioB = isAM_B ? (studentB.amRatio !== undefined ? studentB.amRatio : studentB.ratio) :
                      isPM_B ? (studentB.pmRatio !== undefined ? studentB.pmRatio : studentB.ratio) :
                      studentB.ratio;
        
        const is2to1_A = ratioA === '2:1';
        const is2to1_B = ratioB === '2:1';
        
        if (is2to1_A !== is2to1_B) {
          return is2to1_A ? -1 : 1; // 2:1 students first
        }
        
        // 2. Priority: Students with smaller team sizes (harder to staff)
        const teamSizeA = (studentA.teamStaff || []).length;
        const teamSizeB = (studentB.teamStaff || []).length;
        
        if (teamSizeA !== teamSizeB) {
          return teamSizeA - teamSizeB; // Smaller teams first
        }
        
        return 0; // Equal priority
      });
      
      for (let pass = 1; pass <= 3; pass++) {
        unassignedSessions.forEach(assignment => {
          if (assignment.assigned) return;
          
          const student = students.find(s => s.id === assignment.studentId);
          if (!student) return;

          // TEAM BCBAs ONLY for AM/PM sessions
          console.log(`DEBUG: ${student.name} team staff for BCBA fallback:`, student.teamStaff);
          
          const teamBCBAs = (student.teamStaff || [])
            .map(name => getStaffByName(name))
            .filter(member => 
              member && 
              member.role === 'BCBA' &&
              member.available
            );
          
          console.log(`DEBUG: ${student.name} available team BCBAs:`, teamBCBAs.map(m => `${m.name} (${m.role})`));
              
          if (teamBCBAs.length === 0) {
            console.log(`⚠️ No team BCBAs available for ${student.name} - ${assignment.sessionType}. Session will remain UNASSIGNED.`);
            return; // Skip this assignment - maintain team-only restriction
          }
          
          // Filter by session time availability and prevent all-day assignments
          let availableTeamBCBAs = teamBCBAs.filter(member => {
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            
            if (isAM && staffUsage[member.id].am) return false;
            if (isPM && staffUsage[member.id].pm) return false;
            
            // Check daily attendance - exclude if absent
            const sessionForAttendance = assignment.sessionType.includes('AM') ? 'AM' : 'PM';
            if (isStaffAbsent(member, sessionForAttendance)) return false;
            
            // Prevent same staff from being assigned to same student all day
            const pairingKey = `${assignment.studentId}-${member.id}`;
            if (studentStaffPairings[pairingKey]) return false;
            
            return true;
          });

          console.log(`DEBUG: Available team BCBAs for ${student.name} - ${assignment.sessionType}: ${availableTeamBCBAs.length}`);

          if (availableTeamBCBAs.length > 0) {
            // Enhanced sorting: variety score and workload balance
            availableTeamBCBAs.sort((a, b) => {
              const aVarietyScore = getVarietyScore(assignment.studentId, a.id, selectedDate);
              const bVarietyScore = getVarietyScore(assignment.studentId, b.id, selectedDate);
              
              // For BCBAs, prefer those with fewer current assignments
              const aCurrentLoad = staffUsage[a.id].sessions;
              const bCurrentLoad = staffUsage[b.id] ? staffUsage[b.id].sessions : 0;
              
              if (aCurrentLoad !== bCurrentLoad) {
                return aCurrentLoad - bCurrentLoad; // Lower workload first
              }
              
              // If workload is equal, use variety
              return bVarietyScore - aVarietyScore;
            });

            const selectedStaff = availableTeamBCBAs[0];
            const varietyScore = getVarietyScore(assignment.studentId, selectedStaff.id, selectedDate);
            assignment.assigned = true;
            
            console.log(`✅ BCBA Fallback: Assigned ${selectedStaff.role} ${selectedStaff.name} to ${student.name} - ${assignment.sessionType}`);
            
            const newSession = {
              id: Date.now() + Math.random(),
              studentId: assignment.studentId,
              staffId: selectedStaff.id,
              sessionType: assignment.sessionType,
              date: selectedDate,
              time: SESSION_TYPES[assignment.sessionType]
            };
            
            newSchedule.push(newSession);
            addAssignmentToHistory(assignment.studentId, selectedStaff.id, selectedDate);
            
            // Track staff-student pairings
            const pairingKey = `${assignment.studentId}-${selectedStaff.id}`;
            studentStaffPairings[pairingKey] = true;
            
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            if (isAM) staffUsage[selectedStaff.id].am = true;
            if (isPM) staffUsage[selectedStaff.id].pm = true;
            staffUsage[selectedStaff.id].sessions += 1;
            
            console.log(`BCBA FALLBACK ${selectedStaff.role} - ${selectedStaff.name} to ${student.name} - ${assignment.sessionType} (variety: ${varietyScore})`);
          }
        });
        
        const remainingUnassigned = unassignedSessions.filter(a => !a.assigned).length;
        console.log(`BCBA Fallback Pass ${pass} completed. Remaining unassigned: ${remainingUnassigned}`);
        if (remainingUnassigned === 0) {
          console.log(`SUCCESS: All sessions assigned after BCBA fallback pass ${pass}`);
          break;
        }
      }
      
      // Final status report
      const finalUnassigned = unassignedSessions.filter(a => !a.assigned);
      if (finalUnassigned.length > 0) {
        console.log(`🚨 FINAL UNASSIGNED SESSIONS: ${finalUnassigned.length} sessions could not be assigned while maintaining team-only restrictions`);
        finalUnassigned.forEach(assignment => {
          const student = students.find(s => s.id === assignment.studentId);
          console.log(`   - ${student ? student.name : 'Unknown'}: ${assignment.sessionType}`);
        });
      }
    }

    // Phase 3: Lunch Coverage Assignment
    console.log('Phase 3: Assigning lunch coverage for 1:1 supervision');
    
    // Group lunch assignments by pairing to ensure paired students get same staff
    const lunchPairGroups = new Map();
    const individualLunchQueue = [];
    
    lunchQueue.forEach(lunchAssignment => {
      const student = students.find(s => s.id === lunchAssignment.studentId);
      if (!student) return;
      
      if (student.lunchPairing && student.lunchPairing.length > 0) {
        // Create a group key for paired students
        const pairKey = [student.id, ...student.lunchPairing].sort().join('-');
        
        if (!lunchPairGroups.has(pairKey)) {
          lunchPairGroups.set(pairKey, []);
        }
        lunchPairGroups.get(pairKey).push(lunchAssignment);
      } else {
        individualLunchQueue.push(lunchAssignment);
      }
    });
    
    // Process paired lunch groups first
    for (const [pairKey, pairAssignments] of lunchPairGroups) {
      if (pairAssignments.length === 0) continue;
      
      // All students in the pair should have the same lunch schedule
      const sessionType = pairAssignments[0].sessionType;
      const studentNames = pairAssignments.map(assignment => {
        const student = students.find(s => s.id === assignment.studentId);
        return student ? student.name : 'Unknown';
      }).join(', ');
      
      // Find available staff for this lunch group
      let lunchCandidates = staff.filter(member => {
        if (!member.available) return false;
        
        // RULE: RBTs MUST be on ALL paired students' teams for lunch assignments
        if (member.role === 'RBT') {
          const allStudentsInPair = pairAssignments.map(assignment => 
            students.find(s => s.id === assignment.studentId)
          ).filter(s => s);
          
          // RBT must be on every student's team in the pairing
          const isOnAllTeams = allStudentsInPair.every(student => 
            student.teamStaff && student.teamStaff.includes(member.name)
          );
          
          if (!isOnAllTeams) {
            return false; // RBT not on all paired students' teams - exclude from lunch candidates
          }
        }
        // Other roles (BCBA, Teacher, EA, MHA, CC, etc.) don't need to be on team for lunch
        
        const hasDirectLunchConflict = newSchedule.some(session => 
          session.staffId === member.id && 
          session.date === selectedDate &&
          session.sessionType === sessionType
        );
        
        let hasTimeConflict = false;
        if (sessionType === 'Lunch 1 (11:30-12:00)') {
          hasTimeConflict = newSchedule.some(session =>
            session.staffId === member.id && 
            session.date === selectedDate &&
            session.sessionType === 'AM Session (8:45-12:00)'
          );
        } else if (sessionType === 'Lunch 2 (12:00-12:30)') {
          hasTimeConflict = newSchedule.some(session =>
            session.staffId === member.id && 
            session.date === selectedDate &&
            session.sessionType === 'PM (12:00-15:00)'
          );
        }
        
        return !hasDirectLunchConflict && !hasTimeConflict;
      });

      if (lunchCandidates.length > 0) {
        // Sort by scheduling status first, then by role priority
        lunchCandidates.sort((a, b) => {
          const aIsScheduled = staffUsage[a.id].sessions > 0;
          const bIsScheduled = staffUsage[b.id].sessions > 0;
          
          if (aIsScheduled !== bIsScheduled) {
            return aIsScheduled ? 1 : -1;
          }
          
          const getRolePriorityForLunch = (role) => {
            if (role === 'BCBA') return 1;
            if (role === 'Teacher') return 2;
            if (role === 'EA') return 3;
            if (role === 'MHA') return 4;
            if (role === 'CC') return 5;
            if (role === 'Trainer') return 6;
            if (role === 'BS') return 7;
            if (role === 'RBT') return 8;
            if (role === 'Director') return 9;
            return 10;
          };
          
          const aRolePriority = getRolePriorityForLunch(a.role);
          const bRolePriority = getRolePriorityForLunch(b.role);
          return aRolePriority - bRolePriority;
        });
        
        const selectedStaff = lunchCandidates[0];
        const isUnscheduled = staffUsage[selectedStaff.id].sessions === 0;
        
        // Assign the same staff member to all students in the pair
        pairAssignments.forEach(assignment => {
          const lunchSession = {
            id: Date.now() + Math.random(),
            studentId: assignment.studentId,
            staffId: selectedStaff.id,
            sessionType: assignment.sessionType,
            date: selectedDate,
            time: SESSION_TYPES[assignment.sessionType],
            isPairedLunch: true
          };
          
          newSchedule.push(lunchSession);
        });
        
        staffUsage[selectedStaff.id].lunchCoverage += pairAssignments.length;
        
        console.log(`Paired lunch coverage: ${selectedStaff.role} ${selectedStaff.name} for ${studentNames} - ${sessionType}${isUnscheduled ? ' (unscheduled staff - preferred)' : ' (already scheduled)'}`);
      } else {
        console.log(`WARNING: No available staff for paired lunch coverage for ${studentNames} - ${sessionType}`);
      }
    }
    
    // Process individual lunch assignments
    individualLunchQueue.forEach(lunchAssignment => {
      const student = students.find(s => s.id === lunchAssignment.studentId);
      if (!student) return;

      // Find available staff for lunch 
      let lunchCandidates = staff.filter(member => {
        if (!member.available) return false;
        
        // RULE: RBTs MUST be on the student's team for lunch assignments
        if (member.role === 'RBT') {
          if (!student.teamStaff || !student.teamStaff.includes(member.name)) {
            return false; // RBT not on team - exclude from lunch candidates
          }
        }
        // Other roles (BCBA, Teacher, EA, MHA, CC, etc.) don't need to be on team for lunch
        
        const lunchTimeSlot = lunchAssignment.sessionType;
        
        const hasDirectLunchConflict = newSchedule.some(session => 
          session.staffId === member.id && 
          session.date === selectedDate &&
          session.sessionType === lunchTimeSlot
        );
        
        let hasTimeConflict = false;
        if (lunchTimeSlot === 'Lunch 1 (11:30-12:00)') {
          hasTimeConflict = newSchedule.some(session =>
            session.staffId === member.id && 
            session.date === selectedDate &&
            session.sessionType === 'AM Session (8:45-12:00)'
          );
        } else if (lunchTimeSlot === 'Lunch 2 (12:00-12:30)') {
          hasTimeConflict = newSchedule.some(session =>
            session.staffId === member.id && 
            session.date === selectedDate &&
            session.sessionType === 'PM (12:00-15:00)'
          );
        }
        
        return !hasDirectLunchConflict && !hasTimeConflict;
      });

      // Prefer staff who aren't already assigned to this student (to maximize variety)
      const pairingKey = `${lunchAssignment.studentId}`;
      const staffNotWorkingWithStudent = lunchCandidates.filter(member => 
        !studentStaffPairings[`${pairingKey}-${member.id}`]
      );

      const finalCandidates = staffNotWorkingWithStudent.length > 0 ? staffNotWorkingWithStudent : lunchCandidates;

      if (finalCandidates.length > 0) {
        // Sort by scheduling status first, then by role priority
        finalCandidates.sort((a, b) => {
          const aIsScheduled = staffUsage[a.id].sessions > 0;
          const bIsScheduled = staffUsage[b.id].sessions > 0;
          
          if (aIsScheduled !== bIsScheduled) {
            return aIsScheduled ? 1 : -1;
          }
          
          const getRolePriorityForLunch = (role) => {
            if (role === 'BCBA') return 1;
            if (role === 'Teacher') return 2;
            if (role === 'EA') return 3;
            if (role === 'MHA') return 4;
            if (role === 'CC') return 5;
            if (role === 'Trainer') return 6;
            if (role === 'BS') return 7;
            if (role === 'RBT') return 8;
            if (role === 'Director') return 9;
            return 10;
          };
          
          const aRolePriority = getRolePriorityForLunch(a.role);
          const bRolePriority = getRolePriorityForLunch(b.role);
          return aRolePriority - bRolePriority;
        });
        
        const selectedStaff = finalCandidates[0];
        const isUnscheduled = staffUsage[selectedStaff.id].sessions === 0;
        
        const lunchSession = {
          id: Date.now() + Math.random(),
          studentId: lunchAssignment.studentId,
          staffId: selectedStaff.id,
          sessionType: lunchAssignment.sessionType,
          date: selectedDate,
          time: SESSION_TYPES[lunchAssignment.sessionType]
        };
        
        newSchedule.push(lunchSession);
        staffUsage[selectedStaff.id].lunchCoverage += 1;
        
        console.log(`Individual lunch coverage: ${selectedStaff.role} ${selectedStaff.name} for ${student.name} - ${lunchAssignment.sessionType}${isUnscheduled ? ' (unscheduled staff - preferred)' : ' (already scheduled)'}`);
      } else {
        console.log(`WARNING: No available staff for lunch coverage for ${student.name} - ${lunchAssignment.sessionType}`);
        console.log('Available staff:', staff.filter(s => s.available).map(s => `${s.role} ${s.name}`));
        console.log('Lunch candidates after filtering:', lunchCandidates.map(s => `${s.role} ${s.name}`));
      }
    });

    // Generate analysis
    const analysis = generateAnalysis(newSchedule);
    setScheduleAnalysis(analysis);

    // DEBUGGING: Log unassigned sessions and available staff for troubleshooting
    const finalUnassigned = unassignedSessions.filter(a => !a.assigned);
    if (finalUnassigned.length > 0) {
      console.log('\n🚨 FINAL UNASSIGNED SESSIONS:');
      finalUnassigned.forEach(assignment => {
        const student = students.find(s => s.id === assignment.studentId);
        console.log(`- ${student?.name || 'Unknown'}: ${assignment.sessionType}`);
      });
      
      // Show available RBTs and BS staff who could potentially be assigned
      const availableRBTs = staff.filter(s => s.available && s.role === 'RBT');
      const availableBS = staff.filter(s => s.available && s.role === 'BS');
      
      console.log('\n📊 AVAILABLE PRIMARY STAFF:');
      console.log(`RBTs (${availableRBTs.length}):`, availableRBTs.map(s => `${s.name} (absent: ${getStaffAttendance(s.id, selectedDate)})`));
      console.log(`BS (${availableBS.length}):`, availableBS.map(s => `${s.name} (absent: ${getStaffAttendance(s.id, selectedDate)})`));
    }

    return newSchedule;
  };

  const generateAnalysis = (currentSchedule) => {
    try {
      const todaySchedule = currentSchedule.filter(s => s.date === selectedDate);
      
      const amSessions = todaySchedule.filter(s => s.sessionType && s.sessionType.includes('AM'));
      const pmSessions = todaySchedule.filter(s => s.sessionType && s.sessionType.includes('PM'));
      
      const presentStudents = students.filter(s => getStudentAttendance(s.id, selectedDate) !== 'absent_full');
      const amPresentStudents = presentStudents.filter(s => !isStudentAbsent(s, 'AM'));
      const pmPresentStudents = presentStudents.filter(s => !isStudentAbsent(s, 'PM'));
      
      // Count unique students with assignments, not total sessions (fixes >100% issue)
      const amAssignedStudents = new Set(amSessions.map(s => s.studentId)).size;
      const pmAssignedStudents = new Set(pmSessions.map(s => s.studentId)).size;
      
      const amUtilization = amPresentStudents.length > 0 ? Math.round((amAssignedStudents / amPresentStudents.length) * 100) : 100;
      const pmUtilization = pmPresentStudents.length > 0 ? Math.round((pmAssignedStudents / pmPresentStudents.length) * 100) : 100;

      const amRoleDistribution = {};
      const pmRoleDistribution = {};
      
      amSessions.forEach(session => {
        const staffMember = staff.find(s => s.id === session.staffId);
        if (staffMember && staffMember.role) {
          amRoleDistribution[staffMember.role] = (amRoleDistribution[staffMember.role] || 0) + 1;
        }
      });
      
      pmSessions.forEach(session => {
        const staffMember = staff.find(s => s.id === session.staffId);
        if (staffMember && staffMember.role) {
          pmRoleDistribution[staffMember.role] = (pmRoleDistribution[staffMember.role] || 0) + 1;
        }
      });

      // Get all assigned staff IDs (AM, PM, and Lunch)
      const assignedStaffIds = new Set(todaySchedule.map(s => s.staffId));
      
      // Calculate truly unassigned staff
      const availableStaff = staff.filter(s => s.available);
      const unavailableStaff = staff.filter(s => !s.available);
      const unassignedStaff = availableStaff.filter(s => !assignedStaffIds.has(s.id));
      
      // Separate AM/PM unassigned and unavailable staff (considering attendance AND locked assignments)
      const amAssignedStaffIds = new Set(amSessions.map(s => s.staffId));
      const pmAssignedStaffIds = new Set(pmSessions.map(s => s.staffId));
      
      // Get locked assignment staff IDs
      const amLockedStaffIds = new Set();
      const pmLockedStaffIds = new Set();
      
      Object.values(lockedAssignments).forEach(locks => {
        if (locks.AM) amLockedStaffIds.add(locks.AM);
        if (locks.PM) pmLockedStaffIds.add(locks.PM);
      });
      
      const unassignedAMStaff = availableStaff.filter(s => {
        if (amAssignedStaffIds.has(s.id)) return false; // Already assigned in schedule
        if (amLockedStaffIds.has(s.id)) return false; // Locked to a student (considered assigned)
        const attendance = getStaffAttendance(s.id, selectedDate);
        return attendance !== 'absent_full' && attendance !== 'absent_am';
      });
      
      const unassignedPMStaff = availableStaff.filter(s => {
        if (pmAssignedStaffIds.has(s.id)) return false; // Already assigned in schedule
        if (pmLockedStaffIds.has(s.id)) return false; // Locked to a student (considered assigned)
        const attendance = getStaffAttendance(s.id, selectedDate);
        return attendance !== 'absent_full' && attendance !== 'absent_pm';
      });
      
      // Get staff who are absent for the day (daily attendance)
      const absentAMStaff = availableStaff.filter(s => {
        const attendance = getStaffAttendance(s.id, selectedDate);
        return attendance === 'absent_full' || attendance === 'absent_am';
      });
      
      const absentPMStaff = availableStaff.filter(s => {
        const attendance = getStaffAttendance(s.id, selectedDate);
        return attendance === 'absent_full' || attendance === 'absent_pm';
      });

      return {
        amUtilization,
        pmUtilization,
        amRoleDistribution,
        pmRoleDistribution,
        unassignedStaff,
        unassignedAMStaff,
        unassignedPMStaff,
        unavailableStaff, // SharePoint unavailable (permanent)
        absentAMStaff,    // Daily attendance absent AM
        absentPMStaff,    // Daily attendance absent PM
        totalAvailableStaff: availableStaff.length,
        totalAssignedStaff: assignedStaffIds.size,
        issues: []
      };
    } catch (error) {
      console.error('Analysis generation failed:', error);
      return {
        amUtilization: 0,
        pmUtilization: 0,
        amRoleDistribution: {},
        pmRoleDistribution: {},
        unassignedStaff: [],
        unassignedAMStaff: [],
        unassignedPMStaff: [],
        unavailableStaff: [],
        absentAMStaff: [],
        absentPMStaff: [],
        totalAvailableStaff: 0,
        totalAssignedStaff: 0,
        issues: []
      };
    }
  };

  const handleAutoAssign = () => {
    try {
      console.log('\n🚀 Starting Auto-Assignment...');
      
      // DEBUG: Show current staff breakdown by role
      const roleBreakdown = {};
      staff.forEach(s => {
        if (!roleBreakdown[s.role]) roleBreakdown[s.role] = { total: 0, available: 0, absent: 0 };
        roleBreakdown[s.role].total++;
        if (s.available) roleBreakdown[s.role].available++;
        
        const attendance = getStaffAttendance(s.id, selectedDate);
        if (attendance === 'absent_full' || attendance === 'absent_am' || attendance === 'absent_pm') {
          roleBreakdown[s.role].absent++;
        }
      });
      
      console.log('\n📊 STAFF BREAKDOWN BY ROLE:');
      Object.keys(roleBreakdown).sort().forEach(role => {
        const data = roleBreakdown[role];
        console.log(`${role}: ${data.total} total, ${data.available} available, ${data.absent} absent`);
      });
      
      const newSchedule = generateSchedule();
      setSchedule(newSchedule);
      // Don't show the popup modal anymore - analysis is shown inline
      console.log('✅ Auto-assignment completed successfully');
    } catch (error) {
      console.error('❌ Auto-assignment failed:', error);
      alert('Auto-assignment failed: ' + error.message);
    }
  };

  const handleClearSchedule = () => {
    setSchedule([]);
    setScheduleAnalysis(null);
    setShowAnalysis(false);
  };

  const handleFinalizeSchedule = async () => {
    if (schedule.length === 0) {
      alert('No schedule to finalize.');
      return;
    }

    try {
      const todaySchedule = getSessionsForDate();
      if (todaySchedule.length === 0) {
        alert('No schedule for the selected date.');
        return;
      }

      const confirmed = window.confirm(`Are you sure you want to finalize the schedule for ${selectedDate}? This will save it as the official schedule for variety tracking.`);
      
      if (confirmed) {
        await graphService.saveFinalSchedule(todaySchedule, selectedDate);
        
        // Update local assignment history
        todaySchedule.forEach(session => {
          const key = `${session.studentId}-${session.staffId}`;
          setAssignmentHistory(prev => {
            const existing = prev[key] || [];
            const updated = [selectedDate, ...existing.filter(date => date !== selectedDate)].slice(0, 10);
            return {
              ...prev,
              [key]: updated
            };
          });
        });

        alert('Schedule finalized successfully! This schedule is now saved for variety tracking.');
      }
    } catch (error) {
      console.error('Failed to finalize schedule:', error);
      alert('Failed to finalize schedule: ' + error.message);
    }
  };

  const handleExportCSV = () => {
    if (schedule.length === 0) {
      alert('No schedule data to export.');
      return;
    }

    const todaySchedule = getSessionsForDate();
    const headers = ['Student Name', 'Program', 'AM Session', 'PM Session', 'Staff Assignments'];
    
    const rows = students.map(student => {
      const amSession = todaySchedule.find(s => s.studentId === student.id && s.sessionType.includes('AM'));
      const pmSession = todaySchedule.find(s => s.studentId === student.id && s.sessionType.includes('PM'));
      
      const amStaff = amSession ? staff.find(s => s.id === amSession.staffId) : null;
      const pmStaff = pmSession ? staff.find(s => s.id === pmSession.staffId) : null;
      
      return [
        student.name,
        getProgramForStudent(student),
        amStaff ? `${amStaff.role} ${amStaff.name}` : 'UNASSIGNED',
        pmStaff ? `${pmStaff.role} ${pmStaff.name}` : 'UNASSIGNED',
        `AM: ${amStaff ? amStaff.name : 'None'}, PM: ${pmStaff ? pmStaff.name : 'None'}`
      ];
    });

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ABA_Schedule_${selectedDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleToggleTeamExpansion = (studentId) => {
    setExpandedTeams(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(studentId)) {
        newExpanded.delete(studentId);
      } else {
        newExpanded.add(studentId);
      }
      return newExpanded;
    });
  };

  const renderTeamStaff = (student) => {
    const isExpanded = expandedTeams.has(student.id);
    const teamStaff = student.teamStaff || [];
    const maxDisplay = 8;
    
    if (teamStaff.length <= maxDisplay) {
      return (
        <div className="text-xs text-gray-600 max-w-xs">
          {teamStaff.join(', ')}
        </div>
      );
    }
    
    if (isExpanded) {
      return (
        <div className="text-xs text-gray-600 max-w-xs">
          {teamStaff.join(', ')}{' '}
          <button
            onClick={() => handleToggleTeamExpansion(student.id)}
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            show less
          </button>
        </div>
      );
    }
    
    const displayedStaff = teamStaff.slice(0, maxDisplay);
    const remainingCount = teamStaff.length - maxDisplay;
    
    return (
      <div className="text-xs text-gray-600 max-w-xs">
        {displayedStaff.join(', ')}{' '}
        <button
          onClick={() => handleToggleTeamExpansion(student.id)}
          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          +{remainingCount} more
        </button>
      </div>
    );
  };

    const getStudentScheduleRow = (student) => {
    const todaySessions = schedule.filter(s => s.date === selectedDate);
    const studentSessions = todaySessions.filter(s => s.studentId === student.id);

    const amSessions = studentSessions.filter(s => 
      s.sessionType === 'AM Session (8:45-11:30)' || s.sessionType === 'AM Session (8:45-12:00)'
    );
    const pmSessions = studentSessions.filter(s => 
      s.sessionType === 'PM (12:00-15:00)' || s.sessionType === 'PM (12:30-15:00)'
    );
    const lunch1Session = studentSessions.find(s => s.sessionType === 'Lunch 1 (11:30-12:00)');
    const lunch2Session = studentSessions.find(s => s.sessionType === 'Lunch 2 (12:00-12:30)');

    const isAbsentFull = getStudentAttendance(student.id, selectedDate) === 'absent_full';
    const isAbsentAM = isStudentAbsent(student, 'AM');
    const isAbsentPM = isStudentAbsent(student, 'PM');

    // Helper function to detect staff conflicts
    const hasStaffConflict = (staffId, currentSessionType, currentStudentId) => {
      if (!staffId) return false;
      
      const currentStudent = students.find(s => s.id === currentStudentId);
      if (!currentStudent) return false;
      
      // Skip conflict checking for lunch sessions - multiple students per staff is expected
      if (currentSessionType.includes('Lunch')) {
        return false;
      }
      
      // NOTE: No need to check team staff anymore since algorithm prevents non-team assignments
      
      // Check for same-time conflicts (staff assigned to multiple students at same time)
      const conflictingAssignments = todaySessions.filter(session => 
        session.staffId === staffId && 
        session.studentId !== currentStudentId &&
        doSessionTypesOverlap(session.sessionType, currentSessionType)
      );

      // For legitimate 2:1 assignments, don't flag as conflict if both students have 2:1 ratio
      if (conflictingAssignments.length > 0) {
        const isLegitimate2to1 = conflictingAssignments.every(conflictSession => {
          const conflictStudent = students.find(s => s.id === conflictSession.studentId);
          
          // Determine which ratio to check based on session type
          const getCurrentRatio = (student, sessionType) => {
            if (sessionType.includes('AM')) return student.amRatio !== undefined ? student.amRatio : student.ratio;
            if (sessionType.includes('PM')) return student.pmRatio !== undefined ? student.pmRatio : student.ratio;
            return student.ratio; // Fallback for other session types
          };
          
          const conflictStudentRatio = getCurrentRatio(conflictStudent, conflictSession.sessionType);
          const currentStudentRatio = getCurrentRatio(currentStudent, currentSessionType);
          
          return conflictStudent && conflictStudentRatio === '2:1' && currentStudentRatio === '2:1';
        });
        
        if (isLegitimate2to1) {
          return false; // No conflict for valid 2:1 assignments
        } else {
          return true; // Real conflict - same time, different students, not both 2:1
        }
      }

      // Don't flag all-day assignments as conflicts - this is normal
      return false;
    };

    // Helper function to check if session types overlap in time
    const doSessionTypesOverlap = (sessionType1, sessionType2) => {
      // AM sessions overlap with each other, PM sessions overlap with each other
      const amTypes = ['AM Session (8:45-11:30)', 'AM Session (8:45-12:00)'];
      const pmTypes = ['PM (12:00-15:00)', 'PM (12:30-15:00)'];
      const lunchTypes = ['Lunch 1 (11:30-12:00)', 'Lunch 2 (12:00-12:30)'];
      
      if (amTypes.includes(sessionType1) && amTypes.includes(sessionType2)) return true;
      if (pmTypes.includes(sessionType1) && pmTypes.includes(sessionType2)) return true;
      if (lunchTypes.includes(sessionType1) && lunchTypes.includes(sessionType2)) return true;
      
      // Check for lunch/session overlaps
      if (sessionType1 === 'AM Session (8:45-12:00)' && sessionType2 === 'Lunch 1 (11:30-12:00)') return true;
      if (sessionType1 === 'Lunch 1 (11:30-12:00)' && sessionType2 === 'AM Session (8:45-12:00)') return true;
      if (sessionType1 === 'PM (12:00-15:00)' && sessionType2 === 'Lunch 2 (12:00-12:30)') return true;
      if (sessionType1 === 'Lunch 2 (12:00-12:30)' && sessionType2 === 'PM (12:00-15:00)') return true;
      
      return false;
    };    // FIXED: Remove end times from lunch sessions
    const getSessionDisplayTime = (sessionType) => {
      if (sessionType === 'AM Session (8:45-11:30)') return '11:30';
      if (sessionType === 'AM Session (8:45-12:00)') return '12:00';
      if (sessionType === 'Lunch 1 (11:30-12:00)') return ''; // REMOVED TIME
      if (sessionType === 'Lunch 2 (12:00-12:30)') return ''; // REMOVED TIME
      if (sessionType === 'PM (12:00-15:00)') return '12:00';
      if (sessionType === 'PM (12:30-15:00)') return '12:30';
      return '';
    };

    const renderSessionCell = (sessions, sessionType, lunchType = null) => {
      if (sessionType === 'AM' && (isAbsentFull || isAbsentAM)) {
        return { display: 'ABSENT', class: 'bg-gray-200 text-gray-600' };
      }
      if (sessionType === 'PM' && (isAbsentFull || isAbsentPM)) {
        return { display: 'ABSENT', class: 'bg-gray-200 text-gray-600' };
      }
      if (sessionType === 'LUNCH' && isAbsentFull) {
        return { display: 'ABSENT', class: 'bg-gray-200 text-gray-600' };
      }
      
      const sessionArray = Array.isArray(sessions) ? sessions : (sessions ? [sessions] : []);
      
      if (sessionArray.length === 0) {
        if (sessionType === 'LUNCH') {
          // Check if this is the wrong lunch period for the student
          if (lunchType === 'LUNCH1' && student.lunchSchedule === 'Second') {
            return { display: 'N/A', class: 'bg-gray-50 text-gray-500' };
          }
          if (lunchType === 'LUNCH2' && student.lunchSchedule === 'First') {
            return { display: 'N/A', class: 'bg-gray-50 text-gray-500' };
          }
          
          // If it's the correct lunch period, check if student needs ANY kind of lunch coverage
          const needsLunchCoverage = student.requiresLunch1to1 || student.lunchPairing || 
            student.ratio === '2:1' || student.amRatio === '2:1' || student.pmRatio === '2:1';
          
          if (!needsLunchCoverage) {
            return { display: 'N/A', class: 'bg-gray-50 text-gray-500' };
          }
        }
        return { display: 'NEEDED', class: 'bg-yellow-100 text-yellow-700' };
      }

      if (sessionArray.length > 1) {
        const staffDisplays = sessionArray.map(session => {
          const staffMember = staff.find(s => s.id === session.staffId);
          const displayTime = getSessionDisplayTime(session.sessionType);
          const hasConflict = hasStaffConflict(session.staffId, session.sessionType, student.id);
          const alertIcon = hasConflict ? ' ⚠️' : '';
          return staffMember ? `${staffMember.role} ${staffMember.name}${displayTime ? ` (${displayTime})` : ''}${alertIcon}` : 'Unknown';
        });
        
        return {
          display: staffDisplays.join(' + '),
          class: 'bg-orange-100 text-orange-700'
        };
      }

      const session = sessionArray[0];
      const staffMember = staff.find(s => s.id === session.staffId);
      const displayTime = getSessionDisplayTime(session.sessionType);
      const isLocked = session.isLocked;
      const hasConflict = hasStaffConflict(session.staffId, session.sessionType, student.id);
      const lockIcon = isLocked ? ' 🔒' : '';
      const alertIcon = hasConflict ? ' ⚠️' : '';
      const staffDisplay = staffMember ? `${staffMember.role} ${staffMember.name}${displayTime ? ` (${displayTime})` : ''}${lockIcon}${alertIcon}` : 'Unknown';
      
      return {
        display: staffDisplay,
        class: isLocked ? 'bg-green-100 text-green-800 border border-green-300' : (sessionType === 'LUNCH' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700')
      };
    };

    const amCell = renderSessionCell(amSessions, 'AM');
    const pmCell = renderSessionCell(pmSessions, 'PM');
    const lunch1Cell = renderSessionCell(lunch1Session, 'LUNCH', 'LUNCH1');
    const lunch2Cell = renderSessionCell(lunch2Session, 'LUNCH', 'LUNCH2');

    return {
      student,
      amDisplay: amCell.display,
      pmDisplay: pmCell.display,
      lunch1Display: lunch1Cell.display,
      lunch2Display: lunch2Cell.display,
      amClass: amCell.class,
      pmClass: pmCell.class,
      lunch1Class: lunch1Cell.class,
      lunch2Class: lunch2Cell.class
    };
  };

  // Main scheduler interface
  return (
    <div className="max-w-full mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          {/* Status bar */}
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
            <div className="flex justify-between items-center">
              <p className="text-green-800">
                Connected to SharePoint • {staff.length} staff • {students.length} students • {authStatus}
              </p>
              {authStatus === 'Please sign in to continue' && (
                <button
                  onClick={handleSignIn}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium"
                >
                  Sign In to Microsoft
                </button>
              )}
            </div>
          </div>

          {/* Instructions Panel */}
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <h2 className="font-semibold text-yellow-800 mb-2 text-lg">SharePoint-Integrated Instructions</h2>
            <ol className="list-decimal list-inside text-yellow-900 space-y-1">
              <li>Add new staff and clients using the buttons below (saves to SharePoint automatically).</li>
              <li>Manage team assignments and availability - changes save immediately to SharePoint.</li>
              <li>Select staff/student pairs to lock in the last 2 columns to the right.</li>
              <li>Select Auto-Assign Sessions for intelligent scheduling with variety tracking.</li>
              <li>All data persists in SharePoint - no more lost changes!</li>
            </ol>
          </div>

          {/* Analysis Panel */}
          {scheduleAnalysis && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-4">Schedule Analysis - {selectedDate}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-3 border">
                  <h4 className="font-medium text-gray-700 mb-2">AM Sessions ({scheduleAnalysis.amUtilization}% Utilized)</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      RBT: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.RBT) || 0} • 
                      BS: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.BS) || 0} • 
                      BCBA: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.BCBA) || 0} • 
                      Director: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.Director) || 0} • 
                      CC: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.CC) || 0} • 
                      EA: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.EA) || 0} • 
                      Trainer: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.Trainer) || 0} • 
                      Teacher: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.Teacher) || 0} • 
                      MHA: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.MHA) || 0}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {scheduleAnalysis.unassignedAMStaff && scheduleAnalysis.unassignedAMStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-orange-600 mb-1">Unassigned ({scheduleAnalysis.unassignedAMStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.unassignedAMStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
                                staff.role === 'Teacher' ? 'text-orange-600' :
                                staff.role === 'MHA' ? 'text-indigo-600' :
                                staff.role === 'RBT' ? 'text-green-600' :
                                'text-gray-600'
                              }`}>
                                {staff.role} {staff.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {scheduleAnalysis.absentAMStaff && scheduleAnalysis.absentAMStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-red-600 mb-1">Daily Absent ({scheduleAnalysis.absentAMStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.absentAMStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
                                staff.role === 'Teacher' ? 'text-orange-600' :
                                staff.role === 'MHA' ? 'text-indigo-600' :
                                staff.role === 'RBT' ? 'text-green-600' :
                                'text-gray-600'
                              }`}>
                                {staff.role} {staff.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {scheduleAnalysis.unavailableStaff && scheduleAnalysis.unavailableStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-gray-600 mb-1">Unavailable ({scheduleAnalysis.unavailableStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.unavailableStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
                                staff.role === 'Teacher' ? 'text-orange-600' :
                                staff.role === 'MHA' ? 'text-indigo-600' :
                                staff.role === 'RBT' ? 'text-green-600' :
                                'text-gray-600'
                              }`}>
                                {staff.role} {staff.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded p-3 border">
                  <h4 className="font-medium text-gray-700 mb-2">PM Sessions ({scheduleAnalysis.pmUtilization}% Utilized)</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      RBT: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.RBT) || 0} • 
                      BS: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.BS) || 0} • 
                      BCBA: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.BCBA) || 0} • 
                      Director: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.Director) || 0} • 
                      CC: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.CC) || 0} • 
                      EA: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.EA) || 0} • 
                      Trainer: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.Trainer) || 0} • 
                      Teacher: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.Teacher) || 0} • 
                      MHA: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.MHA) || 0}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {scheduleAnalysis.unassignedPMStaff && scheduleAnalysis.unassignedPMStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-orange-600 mb-1">Unassigned ({scheduleAnalysis.unassignedPMStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.unassignedPMStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
                                staff.role === 'Teacher' ? 'text-orange-600' :
                                staff.role === 'MHA' ? 'text-indigo-600' :
                                staff.role === 'RBT' ? 'text-green-600' :
                                'text-gray-600'
                              }`}>
                                {staff.role} {staff.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {scheduleAnalysis.absentPMStaff && scheduleAnalysis.absentPMStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-red-600 mb-1">Daily Absent ({scheduleAnalysis.absentPMStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.absentPMStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
                                staff.role === 'Teacher' ? 'text-orange-600' :
                                staff.role === 'MHA' ? 'text-indigo-600' :
                                staff.role === 'RBT' ? 'text-green-600' :
                                'text-gray-600'
                              }`}>
                                {staff.role} {staff.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {scheduleAnalysis.unavailableStaff && scheduleAnalysis.unavailableStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-gray-600 mb-1">Unavailable ({scheduleAnalysis.unavailableStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.unavailableStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
                                staff.role === 'Teacher' ? 'text-orange-600' :
                                staff.role === 'MHA' ? 'text-indigo-600' :
                                staff.role === 'RBT' ? 'text-green-600' :
                                'text-gray-600'
                              }`}>
                                {staff.role} {staff.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Evoke Daily Schedule</h2>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded-md"
            />
            <button
              onClick={handleClearSchedule}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Clear Schedule
            </button>
            <button
              onClick={handleAutoAssign}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Auto-Assign Sessions
            </button>
            <button
              onClick={handleFinalizeSchedule}
              className={`px-4 py-2 rounded-md transition-colors ${
                schedule.length > 0 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={schedule.length === 0}
            >
              ✓ Finalize Schedule
            </button>
            <button
              onClick={handleExportCSV}
              className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                schedule.length > 0 
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={schedule.length === 0}
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={() => setShowVarietyTracker(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
            >
              Assignment History
            </button>
            <button
              onClick={() => setShowStaffManager(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Manage Staff
            </button>
            <button
              onClick={() => setShowAttendanceManager(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
            >
              Staff & Client Attendance
            </button>
            <button
              onClick={() => setShowTeamManager(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
            >
              Manage Teams
            </button>
            <button
              onClick={() => setShowAddStaff(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Staff
            </button>
            <button
              onClick={() => setShowAddClient(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Add Client
            </button>
          </div>

          {/* Schedule Table */}
          <div className="bg-white border rounded-lg overflow-hidden shadow">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 w-40">STUDENT</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 w-28">PROGRAM</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700 w-44">AM SESSION</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700 w-36">LUNCH 1<br/><span className="text-xs">(11:30-12:00)</span></th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700 w-36">LUNCH 2<br/><span className="text-xs">(12:00-12:30)</span></th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700 w-44">PM SESSION</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700 w-64">TEAM STAFF</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700 w-32">Lock AM</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700 w-32">Lock PM</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const rowData = getStudentScheduleRow(student);
                    const teamStaffMembers = staff.filter(s => s.available && (student.teamStaff || []).includes(s.name));
                    
                    // Get session assignments for this student
                    const amSessions = schedule.filter(s => s.studentId === student.id && s.timeSlot === 'AM');
                    const pmSessions = schedule.filter(s => s.studentId === student.id && s.timeSlot === 'PM');
                    
                    return (
                      <tr key={student.id} className="border-t bg-white">
                        <td className="px-3 py-3 w-40">
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">
                            {student.ratio} • {student.lunchSchedule} Lunch
                            {student.requiresLunch1to1 && <div className="text-red-600">• 1:1 Lunch Required</div>}
                            {student.lunchPairing && !student.requiresLunch1to1 && <div className="text-blue-600">• Paired Lunch</div>}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-left text-gray-800 font-medium w-28 text-sm">{getProgramForStudent(student)}</td>
                        <td className={`px-3 py-3 text-center text-xs font-medium rounded-md mx-1 w-44 ${rowData.amClass}`}>
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-full text-center">
                              {/* Show all staff for 2:1 assignments */}
                              {amSessions.length > 1 ? (
                                <div className="grid grid-cols-2 gap-1">
                                  {amSessions
                                    .sort((a, b) => (a.position || 1) - (b.position || 1))
                                    .map((session, index) => {
                                    const staffMember = staff.find(s => s.id === session.staffId);
                                    return (
                                      <div key={index} className="text-xs border rounded p-1 bg-blue-50">
                                        <div className="font-semibold">Staff {session.position || index + 1}</div>
                                        <div>{staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown'}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div>{rowData.amDisplay}</div>
                              )}
                            </div>
                            {/* Show appropriate dropdowns based on student ratio */}
                            {(student.amRatio !== undefined ? student.amRatio : student.ratio) === '2:1' ? (
                              <div className="grid grid-cols-2 gap-1 w-full mt-1">
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold mb-1">Staff 1:</label>
                                  <select
                                    onChange={(e) => handleManual2to1Assignment(student.id, 'AM', e.target.value, 1)}
                                    className="text-xs p-1 rounded border bg-white w-full"
                                    value=""
                                  >
                                    <option value="">Select Staff 1</option>
                                    {staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).length > 0 ? (
                                      staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).map(member => (
                                        <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                      ))
                                    ) : (
                                      <option disabled value="">No team staff available</option>
                                    )}
                                  </select>
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold mb-1">Staff 2:</label>
                                  <select
                                    onChange={(e) => handleManual2to1Assignment(student.id, 'AM', e.target.value, 2)}
                                    className="text-xs p-1 rounded border bg-white w-full"
                                    value=""
                                  >
                                    <option value="">Select Staff 2</option>
                                    {staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).map(member => (
                                      <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <select
                                onChange={(e) => handleManualAssignment(student.id, 'AM', e.target.value)}
                                className="text-xs p-1 rounded border bg-white w-full max-w-[140px]"
                                value=""
                              >
                                <option value="">Manual Edit</option>
                                {staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).map(member => (
                                  <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>
                        <td className={`px-3 py-3 text-center text-xs font-medium rounded-md mx-1 w-36 ${rowData.lunch1Class}`}>
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-full text-center">{rowData.lunch1Display}</div>
                            {(rowData.lunch1Display === 'NEEDED' || (rowData.lunch1Display !== 'N/A' && rowData.lunch1Display !== 'ABSENT')) && (
                              <select
                                onChange={(e) => handleManualAssignment(student.id, 'LUNCH1', e.target.value)}
                                className="text-xs p-1 rounded border bg-white w-full max-w-[120px]"
                                value=""
                              >
                                <option value="">Manual Edit</option>
                                {staff.filter(s => s.available).map(member => (
                                  <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>
                        <td className={`px-3 py-3 text-center text-xs font-medium rounded-md mx-1 w-36 ${rowData.lunch2Class}`}>
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-full text-center">{rowData.lunch2Display}</div>
                            {(rowData.lunch2Display === 'NEEDED' || (rowData.lunch2Display !== 'N/A' && rowData.lunch2Display !== 'ABSENT')) && (
                              <select
                                onChange={(e) => handleManualAssignment(student.id, 'LUNCH2', e.target.value)}
                                className="text-xs p-1 rounded border bg-white w-full max-w-[120px]"
                                value=""
                              >
                                <option value="">Manual Edit</option>
                                {staff.filter(s => s.available).map(member => (
                                  <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>
                        <td className={`px-3 py-3 text-center text-xs font-medium rounded-md mx-1 w-44 ${rowData.pmClass}`}>
                          <div className="flex flex-col items-center space-y-1">
                            <div className="w-full text-center">
                              {/* Show all staff for 2:1 assignments */}
                              {pmSessions.length > 1 ? (
                                <div className="grid grid-cols-2 gap-1">
                                  {pmSessions
                                    .sort((a, b) => (a.position || 1) - (b.position || 1))
                                    .map((session, index) => {
                                    const staffMember = staff.find(s => s.id === session.staffId);
                                    return (
                                      <div key={index} className="text-xs border rounded p-1 bg-blue-50">
                                        <div className="font-semibold">Staff {session.position || index + 1}</div>
                                        <div>{staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown'}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div>{rowData.pmDisplay}</div>
                              )}
                            </div>
                            {/* Show appropriate dropdowns based on student ratio */}
                            {(student.pmRatio !== undefined ? student.pmRatio : student.ratio) === '2:1' ? (
                              <div className="grid grid-cols-2 gap-1 w-full mt-1">
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold mb-1">Staff 1:</label>
                                  <select
                                    onChange={(e) => handleManual2to1Assignment(student.id, 'PM', e.target.value, 1)}
                                    className="text-xs p-1 rounded border bg-white w-full"
                                    value=""
                                  >
                                    <option value="">Select Staff 1</option>
                                    {staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).map(member => (
                                      <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="flex flex-col">
                                  <label className="text-xs font-semibold mb-1">Staff 2:</label>
                                  <select
                                    onChange={(e) => handleManual2to1Assignment(student.id, 'PM', e.target.value, 2)}
                                    className="text-xs p-1 rounded border bg-white w-full"
                                    value=""
                                  >
                                    <option value="">Select Staff 2</option>
                                    {staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).map(member => (
                                      <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <select
                                onChange={(e) => handleManualAssignment(student.id, 'PM', e.target.value)}
                                className="text-xs p-1 rounded border bg-white w-full max-w-[140px]"
                                value=""
                              >
                                <option value="">Manual Edit</option>
                                {staff.filter(s => s.available && (student.teamStaff || []).includes(s.name)).map(member => (
                                  <option key={member.id} value={member.id}>{member.role} {member.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 w-64">
                          <div className="text-xs text-gray-600 leading-relaxed">
                            {renderTeamStaff(student)}
                          </div>
                        </td>
                        <td className="px-3 py-3 w-32">
                          <select
                            value={lockedAssignments[student.id]?.AM || ''}
                            onChange={e => handleLockAssignment(student.id, 'AM', e.target.value)}
                            className="text-xs p-1 rounded border bg-white w-full"
                          >
                            <option value="">--</option>
                            {teamStaffMembers.map(member => (
                              <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-3 w-32">
                          <select
                            value={lockedAssignments[student.id]?.PM || ''}
                            onChange={e => handleLockAssignment(student.id, 'PM', e.target.value)}
                            className="text-xs p-1 rounded border bg-white w-full"
                          >
                            <option value="">--</option>
                            {teamStaffMembers.map(member => (
                              <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6 text-sm mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-gray-600">Assigned (1:1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
              <span className="text-gray-600">Assigned (2:1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-gray-600">Locked Assignment 🔒</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
              <span className="text-gray-600">Lunch Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span className="text-gray-600">Needs Assignment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Student Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span className="text-gray-600">AM/PM Scheduling Conflict</span>
            </div>
          </div>

          {/* All Modals */}
          <AddStaffModal
            show={showAddStaff}
            onClose={() => setShowAddStaff(false)}
            onAddStaff={handleAddStaff}
          />

          <AddClientModal
            show={showAddClient}
            onClose={() => setShowAddClient(false)}
            onAddClient={handleAddClient}
            availableStaff={staff.filter(s => s.available)}
          />

          <StaffModal
            show={showStaffManager}
            onClose={() => setShowStaffManager(false)}
            staff={staff}
            onToggleAvailability={toggleStaffAvailability}
            selectedDate={selectedDate}
            getStaffAttendance={getStaffAttendance}
            updateStaffAttendance={updateStaffAttendance}
          />

          <TeamModal
            show={showTeamManager}
            onClose={() => setShowTeamManager(false)}
            students={students}
            staff={staff}
            onUpdateTeamStaff={updateTeamStaff}
          />

          <AttendanceModal
            show={showAttendanceManager}
            onClose={() => setShowAttendanceManager(false)}
            students={students}
            selectedDate={selectedDate}
            getStudentAttendance={getStudentAttendance}
            updateStudentAttendance={updateStudentAttendance}
          />

          <VarietyTrackerModal
            show={showVarietyTracker}
            onClose={() => setShowVarietyTracker(false)}
            students={students}
            staff={staff}
            getRecentAssignments={getRecentAssignments}
            getVarietyScore={getVarietyScore}
            selectedDate={selectedDate}
            rawAssignmentHistory={rawAssignmentHistory}
          />

          <AnalysisModal
            show={showAnalysis}
            onClose={() => setShowAnalysis(false)}
            analysis={scheduleAnalysis}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ABAScheduler;