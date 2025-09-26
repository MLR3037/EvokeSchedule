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
  return PRIMARY_STUDENTS.has(student.name.toUpperCase()) ? 'Primary/EI' : 'Secondary/Transition';
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
      staffMember.role.toLowerCase().includes(searchTerm.toLowerCase())
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

const VarietyTrackerModal = ({ show, onClose, students, staff, getRecentAssignments, getVarietyScore, selectedDate }) => {
  if (!show) return null;

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
          <h3 className="text-xl font-semibold">Assignment History & Variety Tracking</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4 overflow-y-scroll" style={{ height: 'calc(90vh - 140px)', maxHeight: 'calc(800px - 140px)' }}>
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
        </div>
        
        <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600">Staff with higher variety scores will be preferred during assignment</p>
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
      
      const [staffData, clientData] = await Promise.all([
        graphService.getAllStaff(),
        graphService.getAllClients()
      ]);
      
      setStaff(staffData);
      setStudents(clientData);
      setAuthStatus(`Data loaded: ${staffData.length} staff, ${clientData.length} students`);
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

  // Manual assignment function
  const handleManualAssignment = (studentId, sessionType, staffId) => {
    if (!staffId) return;
    
    const student = students.find(s => s.id === studentId);
    const staffMember = staff.find(s => s.id === staffId);
    
    if (!student || !staffMember) return;
    
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
    
    setSchedule([...filteredSchedule, newSession]);
    addAssignmentToHistory(studentId, staffId, selectedDate);
    
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

    // Build assignment queue (AM/PM sessions + lunch coverage)
    const assignmentQueue = [];
    const lunchQueue = [];
    
    students.forEach(student => {
      const lock = lockedAssignments[student.id] || {};
      const amSessionType = student.lunchSchedule === 'First' ? 'AM Session (8:45-11:30)' : 'AM Session (8:45-12:00)';
      const pmSessionType = student.lunchSchedule === 'First' ? 'PM (12:00-15:00)' : 'PM (12:30-15:00)';

      if (!lock.AM && !isStudentAbsent(student, 'AM')) {
        assignmentQueue.push({
          studentId: student.id,
          sessionType: amSessionType,
          assigned: false,
          requires2to1: student.ratio === '2:1' || student.amRatio === '2:1',
          isPaired: !!student.pairedWith
        });
      }

      if (!lock.PM && !isStudentAbsent(student, 'PM')) {
        const pmRatio = student.pmRatio || student.ratio;
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
      const needsLunchCoverage = student.requiresLunch1to1 || student.lunchPairing || student.ratio === '2:1';
      
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

    // Multi-phase assignment algorithm
    console.log('Phase 1: Assigning TEAM RBTs and BS only');
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
            }
          }
        });
      });
      
      const remainingUnassigned = assignmentQueue.filter(a => !a.assigned).length;
      if (remainingUnassigned === 0) {
        console.log(`SUCCESS: All sessions assigned using TEAM staff only after pass ${pass}`);
        break;
      }
    }

    // Phase 2: System-wide assignment for any remaining unassigned sessions
    const unassignedSessions = assignmentQueue.filter(a => !a.assigned);
    if (unassignedSessions.length > 0) {
      console.log(`Phase 2: System-wide assignment for ${unassignedSessions.length} remaining sessions`);
      
      for (let pass = 1; pass <= 10; pass++) {
        unassignedSessions.forEach(assignment => {
          if (assignment.assigned) return;
          
          const student = students.find(s => s.id === assignment.studentId);
          if (!student) return;

          let availableStaff = staff.filter(member => member.available);
          
          // Filter by session time availability and prevent all-day assignments
          availableStaff = availableStaff.filter(member => {
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            
            if (isAM && staffUsage[member.id].am) return false;
            if (isPM && staffUsage[member.id].pm) return false;
            
            // Prevent same staff from being assigned to same student all day
            const pairingKey = `${assignment.studentId}-${member.id}`;
            if (studentStaffPairings[pairingKey]) return false;
            
            return true;
          });

          if (availableStaff.length > 0) {
            // Sort by variety score
            availableStaff.sort((a, b) => {
              const aVarietyScore = getVarietyScore(assignment.studentId, a.id, selectedDate);
              const bVarietyScore = getVarietyScore(assignment.studentId, b.id, selectedDate);
              
              // Prefer RBT/BS over BCBA for system-wide assignments too
              const aRoleBonus = ['RBT', 'BS'].includes(a.role) ? 20 : 0;
              const bRoleBonus = ['RBT', 'BS'].includes(b.role) ? 20 : 0;
              
              return (bVarietyScore + bRoleBonus) - (aVarietyScore + aRoleBonus);
            });

            const selectedStaff = availableStaff[0];
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
            
            // Track staff-student pairings
            const pairingKey = `${assignment.studentId}-${selectedStaff.id}`;
            studentStaffPairings[pairingKey] = true;
            
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            if (isAM) staffUsage[selectedStaff.id].am = true;
            if (isPM) staffUsage[selectedStaff.id].pm = true;
            staffUsage[selectedStaff.id].sessions += 1;
            
            console.log(`System ${selectedStaff.role} - ${selectedStaff.name} to ${student.name} - ${assignment.sessionType} (variety: ${varietyScore})`);
          }
        });
        
        const remainingUnassigned = unassignedSessions.filter(a => !a.assigned).length;
        if (remainingUnassigned === 0) {
          console.log(`SUCCESS: All sessions assigned after system-wide pass ${pass}`);
          break;
        }
      }
    }

    // Phase 3: Lunch Coverage Assignment
    console.log('Phase 3: Assigning lunch coverage for 1:1 supervision');
    lunchQueue.forEach(lunchAssignment => {
      const student = students.find(s => s.id === lunchAssignment.studentId);
      if (!student) return;

      // Find available staff for lunch 
      let lunchCandidates = staff.filter(member => {
        if (!member.available) return false;
        
        // Check if staff is free during the specific lunch time slot
        const lunchTimeSlot = lunchAssignment.sessionType; // e.g., "Lunch 1 (11:30-12:00)" or "Lunch 2 (12:00-12:30)"
        
        const hasDirectLunchConflict = newSchedule.some(session => 
          session.staffId === member.id && 
          session.date === selectedDate &&
          session.sessionType === lunchTimeSlot
        );
        
        // For Lunch 1 (11:30-12:00), check if staff has AM session that goes until 12:00
        // For Lunch 2 (12:00-12:30), check if staff has PM session that starts at 12:00
        let hasTimeConflict = false;
        if (lunchTimeSlot === 'Lunch 1 (11:30-12:00)') {
          hasTimeConflict = newSchedule.some(session =>
            session.staffId === member.id && 
            session.date === selectedDate &&
            session.sessionType === 'AM Session (8:45-12:00)' // Only conflicts with extended AM
          );
        } else if (lunchTimeSlot === 'Lunch 2 (12:00-12:30)') {
          hasTimeConflict = newSchedule.some(session =>
            session.staffId === member.id && 
            session.date === selectedDate &&
            session.sessionType === 'PM (12:00-15:00)' // Only conflicts with early PM start
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
        // Sort by sessions count (prefer less busy staff), then by role priority
        finalCandidates.sort((a, b) => {
          const aSessions = staffUsage[a.id].sessions;
          const bSessions = staffUsage[b.id].sessions;
          if (aSessions !== bSessions) return aSessions - bSessions;
          
          // If same session count, prefer non-BCBA staff for lunch coverage
          const aRolePriority = a.role === 'BCBA' ? 3 : (a.role === 'BS' ? 2 : 1);
          const bRolePriority = b.role === 'BCBA' ? 3 : (b.role === 'BS' ? 2 : 1);
          return aRolePriority - bRolePriority;
        });
        
        const selectedStaff = finalCandidates[0];
        
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
        
        console.log(`Lunch coverage: ${selectedStaff.role} ${selectedStaff.name} for ${student.name} - ${lunchAssignment.sessionType}`);
      } else {
        console.log(`WARNING: No available staff for lunch coverage for ${student.name} - ${lunchAssignment.sessionType}`);
        console.log('Available staff:', staff.filter(s => s.available).map(s => `${s.role} ${s.name}`));
        console.log('Lunch candidates after filtering:', lunchCandidates.map(s => `${s.role} ${s.name}`));
      }
    });

    // Generate analysis
    const analysis = generateAnalysis(newSchedule);
    setScheduleAnalysis(analysis);

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
      
      // Separate AM/PM unassigned and unavailable staff (considering attendance)
      const amAssignedStaffIds = new Set(amSessions.map(s => s.staffId));
      const pmAssignedStaffIds = new Set(pmSessions.map(s => s.staffId));
      
      const unassignedAMStaff = availableStaff.filter(s => {
        if (amAssignedStaffIds.has(s.id)) return false;
        const attendance = getStaffAttendance(s.id, selectedDate);
        return attendance !== 'absent_full' && attendance !== 'absent_am';
      });
      
      const unassignedPMStaff = availableStaff.filter(s => {
        if (pmAssignedStaffIds.has(s.id)) return false;
        const attendance = getStaffAttendance(s.id, selectedDate);
        return attendance !== 'absent_full' && attendance !== 'absent_pm';
      });
      
      // Get unavailable staff (combining unavailable + absent)
      const unavailableAMStaff = [
        ...unavailableStaff,
        ...availableStaff.filter(s => {
          const attendance = getStaffAttendance(s.id, selectedDate);
          return attendance === 'absent_full' || attendance === 'absent_am';
        })
      ];
      
      const unavailablePMStaff = [
        ...unavailableStaff,
        ...availableStaff.filter(s => {
          const attendance = getStaffAttendance(s.id, selectedDate);
          return attendance === 'absent_full' || attendance === 'absent_pm';
        })
      ];

      return {
        amUtilization,
        pmUtilization,
        amRoleDistribution,
        pmRoleDistribution,
        unassignedStaff,
        unassignedAMStaff,
        unassignedPMStaff,
        unavailableAMStaff,
        unavailablePMStaff,
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
        totalAvailableStaff: 0,
        totalAssignedStaff: 0,
        issues: []
      };
    }
  };

  const handleAutoAssign = () => {
    try {
      console.log('Starting Auto-Assignment...');
      const newSchedule = generateSchedule();
      setSchedule(newSchedule);
      // Don't show the popup modal anymore - analysis is shown inline
      console.log('Auto-assignment completed successfully');
    } catch (error) {
      console.error('Auto-assignment failed:', error);
      alert('Auto-assignment failed: ' + error.message);
    }
  };

  const handleClearSchedule = () => {
    setSchedule([]);
    setScheduleAnalysis(null);
    setShowAnalysis(false);
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

    // FIXED: Remove end times from lunch sessions
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
          const needsLunchCoverage = student.requiresLunch1to1 || student.lunchPairing || student.ratio === '2:1';
          
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
          return staffMember ? `${staffMember.role} ${staffMember.name}${displayTime ? ` (${displayTime})` : ''}` : 'Unknown';
        });
        
        return {
          display: staffDisplays.join(' + '),
          class: 'bg-orange-100 text-orange-700'
        };
      }

      const session = sessionArray[0];
      const staffMember = staff.find(s => s.id === session.staffId);
      const displayTime = getSessionDisplayTime(session.sessionType);
      const staffDisplay = staffMember ? `${staffMember.role} ${staffMember.name}${displayTime ? ` (${displayTime})` : ''}` : 'Unknown';
      
      return {
        display: staffDisplay,
        class: sessionType === 'LUNCH' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
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
                      MHA: {(scheduleAnalysis.amRoleDistribution && scheduleAnalysis.amRoleDistribution.MHA) || 0}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
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
                      {scheduleAnalysis.unavailableAMStaff && scheduleAnalysis.unavailableAMStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-gray-600 mb-1">Unavailable ({scheduleAnalysis.unavailableAMStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.unavailableAMStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
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
                      MHA: {(scheduleAnalysis.pmRoleDistribution && scheduleAnalysis.pmRoleDistribution.MHA) || 0}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
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
                      {scheduleAnalysis.unavailablePMStaff && scheduleAnalysis.unavailablePMStaff.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="font-medium text-gray-600 mb-1">Unavailable ({scheduleAnalysis.unavailablePMStaff.length}):</div>
                          <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                            {scheduleAnalysis.unavailablePMStaff.map(staff => (
                              <div key={staff.id} className={`${
                                staff.role === 'BCBA' ? 'text-purple-600' : 
                                staff.role === 'BS' ? 'text-blue-600' : 
                                staff.role === 'Director' ? 'text-red-600' :
                                staff.role === 'CC' ? 'text-yellow-600' :
                                staff.role === 'EA' ? 'text-pink-600' :
                                staff.role === 'Trainer' ? 'text-orange-600' :
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
              Attendance
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
                                <div className="space-y-1">
                                  {amSessions.map((session, index) => {
                                    const staffMember = staff.find(s => s.id === session.staffId);
                                    return (
                                      <div key={index} className="text-xs">
                                        {staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown'}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div>{rowData.amDisplay}</div>
                              )}
                            </div>
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
                                <div className="space-y-1">
                                  {pmSessions.map((session, index) => {
                                    const staffMember = staff.find(s => s.id === session.staffId);
                                    return (
                                      <div key={index} className="text-xs">
                                        {staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown'}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div>{rowData.pmDisplay}</div>
                              )}
                            </div>
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
          <div className="flex gap-6 text-sm mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-gray-600">Assigned (1:1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
              <span className="text-gray-600">Assigned (2:1)</span>
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