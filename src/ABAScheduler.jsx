import React, { useState } from 'react';
import { Plus, Download, Edit3, Save, X } from 'lucide-react';

const ABAScheduler = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Adam', role: 'RBT', available: true },
    { id: 2, name: 'Alannah', role: 'BS', available: true },
    { id: 3, name: 'Allie', role: 'RBT', available: true },
    { id: 4, name: 'Amber', role: 'RBT', available: true },
    { id: 5, name: 'Araceli', role: 'RBT', available: true },
    { id: 6, name: 'Ari', role: 'RBT', available: true },
    { id: 7, name: 'Berkeley', role: 'BCBA', available: true },
    { id: 8, name: 'Brenda', role: 'RBT', available: true },
    { id: 9, name: 'Carmelo', role: 'RBT', available: true },
    { id: 10, name: 'Charlie', role: 'RBT', available: true },
    { id: 11, name: 'Cheyenne', role: 'CC', available: true },
    { id: 12, name: 'Christina', role: 'RBT', available: true },
    { id: 13, name: 'Claire', role: 'EA', available: true },
    { id: 14, name: 'Derez', role: 'RBT', available: true },
    { id: 15, name: 'Elise', role: 'RBT', available: true },
    { id: 16, name: 'Elizabeth', role: 'CC', available: true },
    { id: 17, name: 'Emma', role: 'BS', available: true },
    { id: 18, name: 'Faith', role: 'RBT', available: true },
    { id: 19, name: 'Fernando', role: 'RBT', available: true },
    { id: 20, name: 'Fin', role: 'RBT', available: true },
    { id: 21, name: 'Gerhome', role: 'EA', available: true },
    { id: 22, name: 'Gill', role: 'EA', available: true },
    { id: 23, name: 'Grace', role: 'BCBA', available: true },
    { id: 24, name: 'Haason', role: 'RBT', available: true },
    { id: 25, name: 'Haiden', role: 'RBT', available: true },
    { id: 26, name: 'Hannah', role: 'RBT', available: true },
    { id: 27, name: 'Harry', role: 'RBT', available: true },
    { id: 28, name: 'Helen', role: 'BCBA', available: true },
    { id: 29, name: 'Jay S', role: 'BS', available: true },
    { id: 30, name: 'Jayme', role: 'RBT', available: true },
    { id: 31, name: 'Jess', role: 'RBT', available: true },
    { id: 32, name: 'Jordyn', role: 'RBT', available: true },
    { id: 33, name: 'Josh', role: 'RBT', available: true },
    { id: 34, name: 'Jude', role: 'EA', available: true },
    { id: 35, name: 'Karah', role: 'CC', available: true },
    { id: 36, name: 'Kat', role: 'RBT', available: true },
    { id: 37, name: 'Katie', role: 'RBT', available: true },
    { id: 38, name: 'Kaydie', role: 'RBT', available: true },
    { id: 39, name: 'Kerstin', role: 'BCBA', available: true },
    { id: 40, name: 'Keyshawn', role: 'RBT', available: true },
    { id: 41, name: 'Klaus', role: 'RBT', available: true },
    { id: 42, name: 'Laurel', role: 'RBT', available: true },
    { id: 43, name: 'Lex', role: 'RBT', available: true },
    { id: 44, name: 'Liz M', role: 'BS', available: true },
    { id: 45, name: 'Lyndsey', role: 'RBT', available: true },
    { id: 46, name: 'Maddy', role: 'MHA', available: true },
    { id: 47, name: 'Malik', role: 'RBT', available: true },
    { id: 48, name: 'Megan', role: 'BCBA', available: true },
    { id: 49, name: 'Megan M', role: 'RBT', available: true },
    { id: 50, name: 'Mel', role: 'RBT', available: true },
    { id: 51, name: 'Natalie J', role: 'RBT', available: true },
    { id: 52, name: 'Nico', role: 'RBT', available: true },
    { id: 53, name: 'Nicole', role: 'RBT', available: true },
    { id: 54, name: 'Nik', role: 'RBT', available: true },
    { id: 55, name: 'Quay', role: 'RBT', available: true },
    { id: 56, name: 'Robert', role: 'RBT', available: true },
    { id: 57, name: 'Sadie', role: 'CC', available: true },
    { id: 58, name: 'Savannah G', role: 'RBT', available: true },
    { id: 59, name: 'Sebastian', role: 'RBT', available: true },
    { id: 60, name: 'Shae', role: 'BS', available: true },
    { id: 61, name: 'ShaeLoren', role: 'BS', available: true },
    { id: 62, name: 'Syder', role: 'RBT', available: true },
    { id: 63, name: 'Taylor', role: 'RBT', available: true },
    { id: 64, name: 'Tess', role: 'RBT', available: true },
    { id: 65, name: 'Tia', role: 'RBT', available: true },
    { id: 66, name: 'Tina', role: 'BCBA', available: true },
    { id: 67, name: 'Will', role: 'EA', available: true },
    { id: 68, name: 'Zion', role: 'RBT', available: true },
    { id: 69, name: 'Zoe', role: 'BCBA', available: true },
    { id: 70, name: 'Rayann', role: 'RBT', available: true },
    { id: 71, name: 'Anna', role: 'RBT', available: true },
    { id: 72, name: 'Paxtynn', role: 'RBT', available: true },
    { id: 73, name: 'Adriana', role: 'RBT', available: true },
    { id: 74, name: 'Will S', role: 'RBT', available: true },
    { id: 75, name: 'Yun', role: 'RBT', available: true },
    { id: 76, name: 'Anthony', role: 'Teacher', available: true },
    { id: 77, name: 'Joanne', role: 'Teacher', available: true },
    { id: 78, name: 'Noa', role: 'Teacher', available: true },
    { id: 79, name: 'Morgan', role: 'Teacher', available: true },
    { id: 80, name: 'Sam L', role: 'Director', available: true },
    { id: 81, name: 'Natalie C', role: 'Director', available: true },
    { id: 82, name: 'Mary', role: 'Director', available: true },
    { id: 83, name: 'Eliza', role: 'Director', available: true },
    { id: 84, name: 'Sam K', role: 'Clinical Trainer', available: true }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Ada', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Araceli', 'Charlie', 'Helen', 'Katie', 'Klaus', 'Liz M', 'Taylor', 'Lyndsey'] },
    { id: 3, name: 'Alejandro', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Amber', 'Ari', 'Fernando', 'Jayme', 'Keyshawn', 'Klaus', 'Laurel', 'Lex', 'Taylor'] },
    { id: 4, name: 'Asen', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Amber', 'Jay S', 'Katie', 'Keyshawn', 'Lex', 'Liz M', 'Megan M', 'Mel', 'Taylor'] },
    { id: 5, name: 'Austin', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Fernando', 'Haason', 'Harry', 'Jayme', 'Lex', 'Megan M', 'ShaeLoren', 'Yun', 'Adriana'] },
    { id: 6, name: 'Caleb', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Amber', 'Ari', 'Derez', 'Elise', 'Jay S', 'Kat', 'Liz M', 'Megan M', 'Mel', 'ShaeLoren', 'Taylor'] },
    { id: 7, name: 'Charles', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Fernando', 'Katie', 'Keyshawn', 'Klaus', 'Mel', 'Natalie J', 'Nicole', 'Will S'] },
    { id: 8, name: 'Elijah', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Araceli', 'Haason', 'Harry', 'Katie', 'Lex', 'Liz M', 'Robert', 'Will S'] },
    { id: 9, name: 'Gabe', ratio: '1:2', pairedWith: 20, lunchSchedule: 'First', teamStaff: ['Allie', 'Amber', 'Araceli', 'Carmelo', 'Haason', 'Kat', 'Laurel', 'Megan M', 'Natalie J', 'Tia'] },
    { id: 10, name: 'Isaac', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Amber', 'Araceli', 'Fernando', 'Harry', 'Jayme', 'Kat', 'Lex', 'Tia', 'Adriana'] },
    { id: 11, name: 'Joseph', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Allie', 'Araceli', 'Harry', 'Laurel', 'Liz M', 'Megan M', 'Natalie J', 'Nicole', 'Tia', 'Rayann'] },
    { id: 12, name: 'Josephine', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Charlie', 'Jayme', 'Keyshawn', 'Lex', 'Liz M', 'Mel', 'Natalie J', 'Nicole', 'ShaeLoren'] },
    { id: 13, name: 'Justin', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Fernando', 'Haason', 'Harry', 'Laurel', 'Robert', 'Tia', 'Yun'] },
    { id: 14, name: 'Levi', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Araceli', 'Elise', 'Haason', 'Jayme', 'Liz M', 'Mel', 'Nicole', 'Quay', 'Lyndsey'] },
    { id: 15, name: 'Logan', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Derez', 'Haason', 'Jayme', 'Jordyn', 'Keyshawn', 'Lex', 'Mel', 'Natalie J', 'Robert', 'ShaeLoren'] },
    { id: 16, name: 'Lydia', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Araceli', 'Derez', 'Haason', 'Jordyn', 'Keyshawn', 'Laurel', 'Mel', 'Natalie J', 'Robert', 'Tia'] },
    { id: 17, name: 'Mateo', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Amber', 'Harry', 'Kat', 'Liz M', 'Natalie J', 'Quay', 'Tia', 'Yun'] },
    { id: 18, name: 'Michael', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Fernando', 'Helen', 'Katie', 'Klaus', 'Megan M', 'Mel', 'ShaeLoren', 'Will S'] },
    { id: 19, name: 'Peter', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Carmelo', 'Derez', 'Jordyn', 'Keyshawn', 'Klaus', 'Laurel', 'Liz M', 'Quay', 'ShaeLoren'] },
    { id: 20, name: 'Roman', ratio: '1:2', pairedWith: 9, lunchSchedule: 'First', teamStaff: ['Allie', 'Amber', 'Araceli', 'Carmelo', 'Haason', 'Laurel', 'Megan M', 'Natalie J', 'Tia'] },
    { id: 21, name: 'Wenzday', ratio: '2:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Amber', 'Araceli', 'Charlie', 'Elise', 'Fernando', 'Harry', 'Jayme', 'Kat', 'Klaus', 'Laurel', 'Lex', 'ShaeLoren'] },
    { id: 22, name: 'Remi', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Amber', 'Ari', 'Fernando', 'Harry', 'Katie', 'Keyshawn', 'ShaeLoren'] },
    { id: 23, name: 'Kymani', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Carmelo', 'Helen', 'Jay S', 'Klaus', 'Quay', 'Taylor', 'Adriana'] },
    { id: 24, name: 'Arian', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Charlie', 'Derez', 'Helen', 'Jordyn', 'Taylor'] },
    { id: 25, name: 'Vinny', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Charlie', 'Jayme', 'Katie', 'Nicole'] },
    { id: 26, name: 'Bao', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Derez', 'Jay S', 'Jordyn', 'Robert', 'Taylor', 'Yun'] },
    { id: 27, name: 'Adrian', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Charlie', 'Jay S', 'Jordyn', 'Megan M', 'Quay', 'Will S'] },
    { id: 28, name: 'Cesar', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Charlie', 'Fernando', 'Jay S', 'Klaus', 'Quay', 'Robert', 'Taylor', 'Tia'] },
    { id: 29, name: 'Jay', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Carmelo', 'Derez', 'Helen'] },
    { id: 30, name: 'Elias', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Haason', 'Helen', 'Jordyn', 'Mel', 'Quay', 'Robert', 'Will S'] },
    { id: 31, name: 'Milo', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Charlie', 'Helen', 'Jordyn', 'Laurel', 'Robert', 'Lyndsey'] },
    { id: 32, name: 'Aiden', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Emma', 'Faith', 'Fin', 'Haiden', 'Jess', 'Sebastian', 'Tess', 'Rayann'] },
    { id: 33, name: 'Anthony', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Emma', 'Faith', 'Fin', 'Haiden', 'Hannah', 'Sebastian', 'Zion', 'Paxtynn'] },
    { id: 34, name: 'Calvin', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Christina', 'Emma', 'Faith', 'Haiden', 'Hannah', 'Malik', 'Sebastian', 'Syder'] },
    { id: 35, name: 'Carter', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Emma', 'Fin', 'Haiden', 'Hannah', 'Jess', 'Nico', 'Tess'] },
    { id: 36, name: "Dai'Veon", ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Emma', 'Fin', 'Hannah', 'Josh', 'Sebastian', 'Syder', 'Paxtynn', 'Rayann'] },
    { id: 37, name: 'Drake', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Alannah', 'Christina', 'Faith', 'Fin', 'Josh', 'Kaydie', 'Malik', 'Syder', 'Tess'] },
    { id: 38, name: 'Henry', ratio: '1:2', pairedWith: 42, lunchSchedule: 'Second', teamStaff: ['Alannah', 'Faith', 'Fin', 'Haiden', 'Hannah', 'Jess', 'Josh', 'Kaydie', 'Sebastian', 'Zion'] },
    { id: 39, name: 'Kyden', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Christina', 'Faith', 'Haiden', 'Hannah', 'Kaydie'] },
    { id: 40, name: 'Noah', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Emma', 'Haiden', 'Kaydie', 'Malik', 'Nico', 'Tess'] },
    { id: 41, name: 'Ghani', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Brenda', 'Christina', 'Emma', 'Faith', 'Haiden', 'Jess', 'Sebastian', 'Syder', 'Tess', 'Anna'] },
    { id: 42, name: 'Sebastian', ratio: '1:2', pairedWith: 38, lunchSchedule: 'Second', teamStaff: ['Alannah', 'Faith', 'Fin', 'Haiden', 'Hannah', 'Jess', 'Josh', 'Kaydie', 'Sebastian', 'Tess', 'Zion'] },
    { id: 43, name: 'Shawn', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Brenda', 'Christina', 'Hannah', 'Jess', 'Nik', 'Savannah G', 'Syder', 'Tess'] },
    { id: 44, name: 'William', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Brenda', 'Kaydie', 'Nik', 'Shae', 'Syder', 'Tess', 'Zion', 'Paxtynn'] },
    { id: 45, name: 'Darrian', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Jess', 'Malik', 'Nico', 'Nik', 'Savannah G', 'Shae', 'Anna'] },
    { id: 46, name: 'Sean', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Brenda', 'Christina', 'Josh', 'Nico', 'Savannah G', 'Shae', 'Zion'] },
    { id: 47, name: 'Joseph D.', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Brenda', 'Emma', 'Fin', 'Malik', 'Savannah G', 'Syder', 'Zion', 'Paxtynn'] },
    { id: 48, name: "C'Laya", ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Brenda', 'Christina', 'Hannah', 'Malik', 'Nico', 'Nik', 'Savannah G', 'Shae'] },
    { id: 49, name: 'Jesse', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Brenda', 'Josh', 'Malik', 'Nico', 'Nik', 'Shae', 'Zion', 'Anna'] },
    { id: 50, name: 'Austin M.', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Brenda', 'Faith', 'Josh', 'Kaydie', 'Nik', 'Savannah G', 'Shae', 'Syder'] },
    { id: 51, name: 'Bryce', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Christina', 'Jess', 'Malik', 'Nico', 'Nik', 'Savannah G', 'Shae'] },
    { id: 52, name: 'Tejas', ratio: '2:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Christina', 'Jess', 'Josh', 'Kaydie', 'Nico', 'Nik', 'Savannah G', 'Sebastian', 'Shae', 'Zion'] }
  ]);

  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddSession, setShowAddSession] = useState(false);
  const [showTeamManager, setShowTeamManager] = useState(false);
  const [showStaffManager, setShowStaffManager] = useState(false);
  const [assignmentHistory, setAssignmentHistory] = useState([]);
  const [scheduleAnalysis, setScheduleAnalysis] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  // New states for manual assignment
  const [editMode, setEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});

  const sessionTypes = {
    'AM Session (8:45-11:30)': '8:45-11:30',
    'AM Session (8:45-12:00)': '8:45-12:00',
    'Lunch 1 (11:30-12:00)': '11:30-12:00',
    'Lunch 2 (12:00-12:30)': '12:00-12:30',
    'Extended Lunch Coverage (11:30-12:30)': '11:30-12:30',
    'PM (12:00-15:00)': '12:00-15:00',
    'PM (12:30-15:00)': '12:30-15:00'
  };

  const staffPriority = ['RBT', 'BS', 'EA', 'MHA', 'BCBA', 'CC', 'Teacher'];
  const specialistRoles = ['BS', 'EA', 'MHA', 'BCBA'];
  const directServiceRoles = ['RBT', 'BS', 'EA', 'MHA', 'BCBA'];
  const lunchOnlyRoles = ['Director', 'Clinical Trainer']; // Never assigned to AM/PM sessions

  const getStaffByName = (name) => {
    return staff.find(s => s.name === name);
  };

  // CSV Export Function
  const exportToCSV = () => {
    if (schedule.length === 0) {
      alert('No schedule data to export. Please run Auto-Assign first.');
      return;
    }

    const headers = [
      'Date',
      'Student Name',
      'Student Ratio',
      'Lunch Schedule',
      'Session Type',
      'Time',
      'Staff Name',
      'Staff Role',
      'Team Member',
      'Pairing Status',
      'Session ID'
    ];

    const rows = schedule.map(session => {
      const student = students.find(s => s.id === session.studentId);
      const pairedStudent = session.pairedStudentId ? students.find(s => s.id === session.pairedStudentId) : null;
      const staffMember = staff.find(s => s.id === session.staffId);
      const isTeamMember = student?.teamStaff.includes(staffMember?.name) ? 'Yes' : 'No';
      
      // Create student name display for paired students
      let studentNameDisplay = student?.name || 'Unknown';
      if (pairedStudent) {
        // Show names in consistent order (lower ID first)
        if (session.studentId < session.pairedStudentId) {
          studentNameDisplay = `${student?.name}/${pairedStudent.name}`;
        } else {
          studentNameDisplay = `${pairedStudent.name}/${student?.name}`;
        }
      }
      
      return [
        session.date,
        studentNameDisplay,
        student?.ratio || 'Unknown',
        student?.lunchSchedule || 'Unknown',
        session.sessionType,
        session.time,
        staffMember?.name || 'Unknown',
        staffMember?.role || 'Unknown',
        isTeamMember,
        session.pairedStudentId ? 'Paired' : 'Individual',
        session.id
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

    console.log(`Exported ${schedule.length} sessions to CSV for ${selectedDate}`);
  };

  // Get eligible staff for a specific session
  const getEligibleStaff = (sessionId) => {
    const session = schedule.find(s => s.id === sessionId);
    if (!session) return [];

    const student = students.find(s => s.id === session.studentId);
    if (!student) return [];

    const isAM = session.sessionType.includes('AM');
    const isPM = session.sessionType.includes('PM');
    const isLunch = session.sessionType.includes('Lunch');

    // Get currently assigned staff usage
    const currentAssignments = schedule.filter(s => s.id !== sessionId); // Exclude current session
    const staffUsage = {};
    
    staff.forEach(member => {
      staffUsage[member.id] = { am: false, pm: false };
    });

    currentAssignments.forEach(s => {
      if (s.sessionType.includes('AM')) {
        staffUsage[s.staffId].am = true;
      } else if (s.sessionType.includes('PM')) {
        staffUsage[s.staffId].pm = true;
      }
    });

    // For lunch sessions, allow more flexibility
    if (isLunch) {
      return staff.filter(member => 
        member.available && 
        (member.role === 'Teacher' || 
         member.role === 'BCBA' || 
         (!isAM || !staffUsage[member.id].am) && 
         (!isPM || !staffUsage[member.id].pm))
      ).sort((a, b) => {
        // Prioritize team members
        const aIsTeam = student.teamStaff.includes(a.name);
        const bIsTeam = student.teamStaff.includes(b.name);
        if (aIsTeam && !bIsTeam) return -1;
        if (!aIsTeam && bIsTeam) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    // For AM/PM sessions, prioritize team members
    return staff.filter(member => {
      if (!member.available) return false;
      if (isAM && staffUsage[member.id].am) return false;
      if (isPM && staffUsage[member.id].pm) return false;
      
      // Prevent same staff working AM+PM with same student
      const studentExistingSessions = currentAssignments.filter(s => s.studentId === session.studentId);
      const hasConflictWithSameStudent = studentExistingSessions.some(existingSession => {
        const existingIsAM = existingSession.sessionType.includes('AM');
        const existingIsPM = existingSession.sessionType.includes('PM');
        
        return existingSession.staffId === member.id && 
               ((isAM && existingIsPM) || (isPM && existingIsAM));
      });
      
      if (hasConflictWithSameStudent) return false;
      
      return true;
    }).sort((a, b) => {
      // Prioritize team members first
      const aIsTeam = student.teamStaff.includes(a.name);
      const bIsTeam = student.teamStaff.includes(b.name);
      if (aIsTeam && !bIsTeam) return -1;
      if (!aIsTeam && bIsTeam) return 1;
      
      // Then by role priority
      const aPriority = staffPriority.indexOf(a.role);
      const bPriority = staffPriority.indexOf(b.role);
      if (aPriority !== bPriority) return aPriority - bPriority;
      
      // Finally by name
      return a.name.localeCompare(b.name);
    });
  };

  // Handle manual assignment change
  const handleAssignmentChange = (sessionId, newStaffId) => {
    setPendingChanges(prev => ({
      ...prev,
      [sessionId]: newStaffId
    }));
  };

  // Apply pending changes
  const applyChanges = () => {
    const updatedSchedule = schedule.map(session => {
      if (pendingChanges[session.id]) {
        return { ...session, staffId: parseInt(pendingChanges[session.id]) };
      }
      return session;
    });
    
    setSchedule(updatedSchedule);
    setPendingChanges({});
    setEditMode(false);
    
    // Regenerate analysis
    const analysis = analyzeSchedule(updatedSchedule);
    setScheduleAnalysis(analysis);
    
    console.log('Manual changes applied successfully');
  };

  // Cancel edit mode
  const cancelEdit = () => {
    setPendingChanges({});
    setEditMode(false);
  };

  const addStaffToTeam = (studentId, staffName) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        if (!student.teamStaff.includes(staffName)) {
          return { ...student, teamStaff: [...student.teamStaff, staffName] };
        }
      }
      return student;
    }));
  };

  const removeStaffFromTeam = (studentId, staffName) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        return { 
          ...student, 
          teamStaff: student.teamStaff.filter(name => name !== staffName) 
        };
      }
      return student;
    }));
  };

  const toggleStaffAvailability = (staffId) => {
    setStaff(prev => prev.map(member => {
      if (member.id === staffId) {
        const newAvailability = !member.available;
        console.log(`${member.name} availability changed to: ${newAvailability ? 'AVAILABLE' : 'UNAVAILABLE'}`);
        return { ...member, available: newAvailability };
      }
      return member;
    }));
  };

  const checkThreeDayRule = (studentId, staffId, date) => {
    const checkDate = new Date(date);
    const assignments = [];
    
    for (let i = 1; i <= 3; i++) {
      const pastDate = new Date(checkDate);
      pastDate.setDate(pastDate.getDate() - i);
      const pastDateStr = pastDate.toISOString().split('T')[0];
      
      const dayAssignments = assignmentHistory.filter(h => 
        h.date === pastDateStr && 
        h.studentId === studentId && 
        h.staffId === staffId &&
        !h.sessionType.includes('Lunch')
      );
      assignments.push(...dayAssignments);
    }
    
    return assignments.length < 3;
  };

  const clearSchedule = () => {
    setSchedule([]);
    setScheduleAnalysis(null);
    setShowAnalysis(false);
    setEditMode(false);
    setPendingChanges({});
    console.log('Schedule cleared for', selectedDate);
  };

  const analyzeSchedule = (sessions) => {
    const availableStaff = staff.filter(s => s.available);
    const amAssignments = new Set();
    const pmAssignments = new Set();
    
    // Track which staff are assigned to AM and PM sessions (excluding lunch)
    sessions.forEach(session => {
      if (session.sessionType.includes('AM Session')) {
        amAssignments.add(session.staffId);
      } else if (session.sessionType.includes('PM')) {
        pmAssignments.add(session.staffId);
      }
    });
    
    // Find unassigned staff for AM and PM
    const unassignedAM = availableStaff.filter(member => 
      !amAssignments.has(member.id) && member.role !== 'Teacher'
    );
    
    const unassignedPM = availableStaff.filter(member => 
      !pmAssignments.has(member.id) && member.role !== 'Teacher'
    );
    
    // Count assignments by role
    const roleAssignments = {
      AM: { RBT: 0, BS: 0, EA: 0, MHA: 0, BCBA: 0, CC: 0 },
      PM: { RBT: 0, BS: 0, EA: 0, MHA: 0, BCBA: 0, CC: 0 }
    };
    
    sessions.forEach(session => {
      const staffMember = staff.find(s => s.id === session.staffId);
      if (staffMember && staffMember.role !== 'Teacher') {
        if (session.sessionType.includes('AM Session')) {
          roleAssignments.AM[staffMember.role] = (roleAssignments.AM[staffMember.role] || 0) + 1;
        } else if (session.sessionType.includes('PM')) {
          roleAssignments.PM[staffMember.role] = (roleAssignments.PM[staffMember.role] || 0) + 1;
        }
      }
    });
    
    // Calculate utilization rates
    const totalAvailableStaff = availableStaff.filter(s => s.role !== 'Teacher').length;
    const amUtilization = totalAvailableStaff > 0 ? ((totalAvailableStaff - unassignedAM.length) / totalAvailableStaff * 100).toFixed(1) : 0;
    const pmUtilization = totalAvailableStaff > 0 ? ((totalAvailableStaff - unassignedPM.length) / totalAvailableStaff * 100).toFixed(1) : 0;
    
    const analysis = {
      unassignedAM,
      unassignedPM,
      roleAssignments,
      utilization: {
        AM: amUtilization,
        PM: pmUtilization
      },
      totalAssigned: {
        AM: totalAvailableStaff - unassignedAM.length,
        PM: totalAvailableStaff - unassignedPM.length
      },
      totalAvailable: totalAvailableStaff
    };
    
    console.log('Schedule Analysis Generated:', analysis);
    return analysis;
  };

  const autoAssignSessions = () => {
    const newSchedule = [];
    const assignmentQueue = [];
    
    // Calculate caseload sizes for each staff member (how many students they're assigned to)
    const staffCaseloads = {};
    staff.forEach(member => {
      const studentCount = students.filter(student => 
        student.teamStaff.includes(member.name)
      ).length;
      staffCaseloads[member.name] = studentCount;
    });
    
    console.log('Prioritization System: Students with smaller teams first, staff with smaller caseloads first');
    
    // Create assignment queue with PRIORITY BASED ON TEAM SIZE
    // Students with fewer team members get priority since they have fewer options
    const processedPairs = new Set(); // Track processed paired students
    
    students.forEach(student => {
      // Skip if this student was already processed as part of a pair
      if (processedPairs.has(student.id)) return;
      
      const amSessionType = student.lunchSchedule === 'First' 
        ? 'AM Session (8:45-11:30)'
        : 'AM Session (8:45-12:00)';

      const pmSessionType = student.lunchSchedule === 'First'
        ? 'PM (12:00-15:00)'
        : 'PM (12:30-15:00)';

      // Priority = smaller team size gets higher priority (lower number = higher priority)
      const teamSize = student.teamStaff.length;
      
      // Check if student is paired
      const isPaired = student.pairedWith !== undefined;
      let pairedStudent = null;
      
      if (isPaired) {
        pairedStudent = students.find(s => s.id === student.pairedWith);
        if (pairedStudent) {
          // Mark both students as processed to avoid duplicate entries
          processedPairs.add(student.id);
          processedPairs.add(pairedStudent.id);
          
          // Verify paired students have same lunch schedule
          if (student.lunchSchedule !== pairedStudent.lunchSchedule) {
            console.warn(`Paired students ${student.name} and ${pairedStudent.name} have different lunch schedules!`);
          }
        }
      }
      
      // Check if student requires 2:1 staffing
      const requires2to1 = student.ratio === '2:1';
      
      assignmentQueue.push({
        studentId: student.id,
        pairedStudentId: isPaired ? student.pairedWith : null,
        sessionType: amSessionType,
        priority: teamSize, // Smaller teams = higher priority
        assigned: false,
        isPaired: isPaired,
        requires2to1: requires2to1,
        staffAssignments: [] // Track multiple staff for 2:1 students
      });
      assignmentQueue.push({
        studentId: student.id,
        pairedStudentId: isPaired ? student.pairedWith : null,
        sessionType: pmSessionType,
        priority: teamSize,
        assigned: false,
        isPaired: isPaired,
        requires2to1: requires2to1,
        staffAssignments: [] // Track multiple staff for 2:1 students
      });
    });

    // SORT BY PRIORITY: Students with smallest teams first
    assignmentQueue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority; // Smaller team size first
      }
      // If same team size, sort by student ID for consistency
      return a.studentId - b.studentId;
    });

    console.log('Assignment Priority Order (smallest teams first):');
    assignmentQueue.slice(0, 10).forEach(assignment => {
      const student = students.find(s => s.id === assignment.studentId);
      console.log(`${student.name}: ${assignment.priority} team members - ${assignment.sessionType}`);
    });

    // Track staff usage to prevent conflicts and optimize specialists
    const staffUsage = {};
    staff.forEach(member => {
      staffUsage[member.id] = { am: false, pm: false, sessions: 0, lunchCoverage: 0 };
    });

    // MAIN ASSIGNMENT ALGORITHM - Priority-Based with Clinical Safety
    // Pass 1-7: Team assignments with constraint relaxation (RBTs stay with teams)
    // Pass 8+: Emergency - specialists only can work outside teams
    
    for (let pass = 1; pass <= 15; pass++) {
      console.log(`Assignment Pass ${pass}:`);
      
      // Emergency mode for specialists only (RBTs always stay with teams)
      const useSpecialistEmergencyMode = pass >= 8;
      
      staffPriority.forEach(roleType => {
        assignmentQueue.forEach(assignment => {
          if (assignment.assigned) return;
          
          const student = students.find(s => s.id === assignment.studentId);
          if (!student) return;
          
          // Get candidate staff for this role
          let candidateStaff;
          
          if (useSpecialistEmergencyMode && specialistRoles.includes(roleType)) {
            // Emergency: Use ANY available specialist (BS, EA, MHA, BCBA), ignore team assignments
            candidateStaff = staff.filter(member => 
              member.role === roleType &&
              member.available &&
              !lunchOnlyRoles.includes(member.role) // Exclude Directors/Clinical Trainers from AM/PM
            );
            if (candidateStaff.length > 0) {
              console.log(`Pass ${pass} SPECIALIST EMERGENCY: Found ${candidateStaff.length} available ${roleType}s for ${student.name} (team size: ${student.teamStaff.length})`);
            }
          } else {
            // Normal mode: ALWAYS use team staff only (including RBTs in emergency)
            candidateStaff = student.teamStaff
              .map(name => getStaffByName(name))
              .filter(member => 
                member && 
                member.role === roleType &&
                member.available &&
                !lunchOnlyRoles.includes(member.role) // Exclude Directors/Clinical Trainers from AM/PM
              );
          }
          
          // Apply constraints based on pass number  
          candidateStaff = candidateStaff.filter(member => {
            // ALWAYS check basic time conflicts
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            
            if (isAM && staffUsage[member.id].am) return false;
            if (isPM && staffUsage[member.id].pm) return false;
            
            // ALWAYS prevent same staff working AM+PM with same student
            const studentExistingSessions = newSchedule.filter(s => s.studentId === assignment.studentId);
            const hasConflictWithSameStudent = studentExistingSessions.some(existingSession => {
              const existingIsAM = existingSession.sessionType.includes('AM');
              const existingIsPM = existingSession.sessionType.includes('PM');
              
              return existingSession.staffId === member.id && 
                     ((isAM && existingIsPM) || (isPM && existingIsAM));
            });
            
            if (hasConflictWithSameStudent) return false;
            
            // CRITICAL: Prevent CC assignment if ANY direct service staff are available system-wide
            if (member.role === 'CC') {
              const availableDirectService = staff.filter(direct => 
                directServiceRoles.includes(direct.role) && 
                direct.available && 
                !staffUsage[direct.id].am && 
                !staffUsage[direct.id].pm
              );
              
              if (availableDirectService.length > 0) {
                console.log(`BLOCKING CC ${member.name} - ${availableDirectService.length} direct service staff still available system-wide`);
                return false;
              }
            }
            
            // CRITICAL: Prevent Teacher assignment if ANY direct service staff OR CCs are available system-wide
            if (member.role === 'Teacher') {
              const availableNonTeachers = staff.filter(nonTeacher => 
                ['RBT', 'BS', 'EA', 'MHA', 'BCBA', 'CC'].includes(nonTeacher.role) && 
                nonTeacher.available && 
                !staffUsage[nonTeacher.id].am && 
                !staffUsage[nonTeacher.id].pm
              );
              
              if (availableNonTeachers.length > 0) {
                console.log(`BLOCKING Teacher ${member.name} - ${availableNonTeachers.length} direct service/CC staff still available system-wide`);
                return false;
              }
            }
            
            // CRITICAL: Prevent EA assignment if ANY RBTs are available system-wide
            if (member.role === 'EA') {
              const availableRBTs = staff.filter(rbt => 
                rbt.role === 'RBT' && 
                rbt.available && 
                !staffUsage[rbt.id].am && 
                !staffUsage[rbt.id].pm
              );
              
              if (availableRBTs.length > 0) {
                console.log(`BLOCKING EA ${member.name} - ${availableRBTs.length} RBTs still available system-wide`);
                return false;
              }
            }
            
            // CRITICAL: Prevent MHA/BCBA assignment if ANY RBTs or EAs are available system-wide  
            if (['MHA', 'BCBA'].includes(member.role)) {
              const availableRBTsAndEAs = staff.filter(lower => 
                ['RBT', 'EA'].includes(lower.role) && 
                lower.available && 
                !staffUsage[lower.id].am && 
                !staffUsage[lower.id].pm
              );
              
              if (availableRBTsAndEAs.length > 0) {
                console.log(`BLOCKING ${member.role} ${member.name} - ${availableRBTsAndEAs.length} RBTs/EAs still available system-wide`);
                return false;
              }
            }
            
            // Apply pass-specific constraints
            if (pass === 1) {
              // Pass 1: ALL constraints (strictest)
              if (!checkThreeDayRule(assignment.studentId, member.id, selectedDate)) return false;
              if (specialistRoles.includes(member.role) && staffUsage[member.id].sessions >= 1) return false;
            } 
            else if (pass === 2) {
              // Pass 2: Relax BS limits only
              if (!checkThreeDayRule(assignment.studentId, member.id, selectedDate)) return false;
              if (['EA', 'MHA', 'BCBA'].includes(member.role) && staffUsage[member.id].sessions >= 1) return false;
            }
            else if (pass === 3) {
              // Pass 3: Relax 3-day rule, keep some specialist limits
              if (['EA', 'MHA', 'BCBA'].includes(member.role) && staffUsage[member.id].sessions >= 1) return false;
            }
            else if (pass === 4) {
              // Pass 4: Relax EA/MHA/BCBA limits, restore 3-day rule
              if (!checkThreeDayRule(assignment.studentId, member.id, selectedDate)) return false;
            }
            else if (pass >= 5) {
              // Pass 5+: Minimal constraints
              // Only basic time conflicts enforced
            }
            
            return true;
          });
          
          // Assign if candidate found
          if (candidateStaff.length > 0) {
            // PRIORITIZE STAFF WITH SMALLER CASELOADS
            candidateStaff.sort((a, b) => {
              const caseloadA = staffCaseloads[a.name] || 0;
              const caseloadB = staffCaseloads[b.name] || 0;
              
              // If caseloads are equal, sort by name for consistency
              if (caseloadA === caseloadB) {
                return a.name.localeCompare(b.name);
              }
              
              return caseloadA - caseloadB; // Smaller caseload first
            });
            
            // Handle 2:1 students (need two staff members)
            if (assignment.requires2to1) {
              const staffNeeded = 2 - assignment.staffAssignments.length;
              
              // Ensure we only get staff from the appropriate source (team vs emergency)
              let eligibleStaff = candidateStaff;
              
              // If we're in emergency mode and using specialists, still prefer team members first
              if (useSpecialistEmergencyMode && specialistRoles.includes(roleType)) {
                // Separate team members from non-team emergency staff
                const teamMembers = candidateStaff.filter(member => 
                  student.teamStaff.includes(member.name)
                );
                const emergencyStaff = candidateStaff.filter(member => 
                  !student.teamStaff.includes(member.name)
                );
                
                // Prefer team members, then emergency staff
                eligibleStaff = [...teamMembers, ...emergencyStaff];
              }
              
              const staffToAssign = eligibleStaff.slice(0, Math.min(staffNeeded, eligibleStaff.length));
              
              // Add staff to this assignment
              assignment.staffAssignments.push(...staffToAssign.map(s => s.id));
              
              // Create sessions for each staff member assigned
              staffToAssign.forEach(selectedStaff => {
                const newSession = {
                  id: Date.now() + Math.random(),
                  studentId: assignment.studentId,
                  pairedStudentId: assignment.pairedStudentId,
                  staffId: selectedStaff.id,
                  sessionType: assignment.sessionType,
                  date: selectedDate,
                  time: sessionTypes[assignment.sessionType],
                  is2to1: true,
                  staffCount: assignment.staffAssignments.length
                };
                
                newSchedule.push(newSession);
                
                // Update staff usage tracking
                const isAM = assignment.sessionType.includes('AM');
                const isPM = assignment.sessionType.includes('PM');
                
                if (isAM) staffUsage[selectedStaff.id].am = true;
                if (isPM) staffUsage[selectedStaff.id].pm = true;
                staffUsage[selectedStaff.id].sessions += 1;
                
                console.log(`Pass ${pass}: 2:1 ASSIGNMENT (${assignment.staffAssignments.length}/2) - ${selectedStaff.role} ${selectedStaff.name} to ${student.name} - ${assignment.sessionType}`);
              });
              
              // Mark assignment as complete only when both staff are assigned
              if (assignment.staffAssignments.length >= 2) {
                assignment.assigned = true;
                
                // If this is a paired student, handle the paired student assignments too
                if (assignment.isPaired && assignment.pairedStudentId) {
                  assignment.staffAssignments.forEach(staffId => {
                    const pairedSession = {
                      id: Date.now() + Math.random() + 0.1,
                      studentId: assignment.pairedStudentId,
                      pairedStudentId: assignment.studentId,
                      staffId: staffId,
                      sessionType: assignment.sessionType,
                      date: selectedDate,
                      time: sessionTypes[assignment.sessionType],
                      is2to1: true,
                      staffCount: assignment.staffAssignments.length
                    };
                    
                    newSchedule.push(pairedSession);
                  });
                  
                  // Mark the corresponding assignment for the paired student as assigned
                  const pairedAssignment = assignmentQueue.find(a => 
                    a.studentId === assignment.pairedStudentId && 
                    a.sessionType === assignment.sessionType &&
                    !a.assigned
                  );
                  if (pairedAssignment) {
                    pairedAssignment.assigned = true;
                    pairedAssignment.staffAssignments = [...assignment.staffAssignments];
                  }
                }
              }
            } else {
              // Regular 1:1 assignment
              const selectedStaff = candidateStaff[0];
              
              // Log candidate selection details for debugging
              if (candidateStaff.length > 1) {
                const alternatives = candidateStaff.slice(1, 3).map(alt => 
                  `${alt.name}(${staffCaseloads[alt.name]})`
                ).join(', ');
                console.log(`Selected ${selectedStaff.name}(caseload:${staffCaseloads[selectedStaff.name]}) over: ${alternatives}`);
              }
              
              const newSession = {
                id: Date.now() + Math.random(),
                studentId: assignment.studentId,
                pairedStudentId: assignment.pairedStudentId,
                staffId: selectedStaff.id,
                sessionType: assignment.sessionType,
                date: selectedDate,
                time: sessionTypes[assignment.sessionType]
              };
              
              newSchedule.push(newSession);
              assignment.assigned = true;
              
              // If this is a paired student, create a session for the paired student too
              if (assignment.isPaired && assignment.pairedStudentId) {
                const pairedSession = {
                  id: Date.now() + Math.random() + 0.1, // Slightly different ID
                  studentId: assignment.pairedStudentId,
                  pairedStudentId: assignment.studentId,
                  staffId: selectedStaff.id,
                  sessionType: assignment.sessionType,
                  date: selectedDate,
                  time: sessionTypes[assignment.sessionType]
                };
                
                newSchedule.push(pairedSession);
                
                // Mark the corresponding assignment for the paired student as assigned
                const pairedAssignment = assignmentQueue.find(a => 
                  a.studentId === assignment.pairedStudentId && 
                  a.sessionType === assignment.sessionType &&
                  !a.assigned
                );
                if (pairedAssignment) {
                  pairedAssignment.assigned = true;
                }
              }
              
              // Update staff usage tracking
              const isAM = assignment.sessionType.includes('AM');
              const isPM = assignment.sessionType.includes('PM');
              
              if (isAM) staffUsage[selectedStaff.id].am = true;
              if (isPM) staffUsage[selectedStaff.id].pm = true;
              staffUsage[selectedStaff.id].sessions += 1;
              
              // Determine assignment type for logging
              const isTeamMember = student.teamStaff.includes(selectedStaff.name);
              const assignmentType = (useSpecialistEmergencyMode && !isTeamMember && specialistRoles.includes(selectedStaff.role)) 
                ? 'SPECIALIST EMERGENCY' 
                : 'TEAM ASSIGNMENT';
              
              console.log(`Pass ${pass}: ${assignmentType} - ${selectedStaff.role} ${selectedStaff.name}(${staffCaseloads[selectedStaff.name]}) to ${student.name} - ${assignment.sessionType}`);
            }
          }
        });
      });
      
      const remainingUnassigned = assignmentQueue.filter(assignment => !assignment.assigned).length;
      console.log(`After Pass ${pass}: ${remainingUnassigned} sessions still unassigned`);
      
      // Log team size distribution of unassigned students
      if (remainingUnassigned > 0) {
        const unassignedTeamSizes = assignmentQueue
          .filter(assignment => !assignment.assigned)
          .map(assignment => {
            const student = students.find(s => s.id === assignment.studentId);
            return student.teamStaff.length;
          });
        const avgTeamSize = (unassignedTeamSizes.reduce((a, b) => a + b, 0) / unassignedTeamSizes.length).toFixed(1);
        console.log(`Unassigned students have average team size: ${avgTeamSize}`);
      }
      
      if (remainingUnassigned === 0) {
        console.log(`✅ ALL SESSIONS ASSIGNED after Pass ${pass} using priority-based assignment!`);
        break;
      }
      
      // If we still have unassigned sessions after pass 15, log detailed analysis
      if (pass === 15 && remainingUnassigned > 0) {
        console.warn(`⚠️ CRITICAL: ${remainingUnassigned} sessions could not be assigned after 15 passes!`);
        
        const unassignedDetails = assignmentQueue
          .filter(assignment => !assignment.assigned)
          .map(assignment => {
            const student = students.find(s => s.id === assignment.studentId);
            return `${student?.name} (team: ${student.teamStaff.length}, ${assignment.sessionType})`;
          });
        console.warn('Unassigned sessions with team sizes:', unassignedDetails);
      }
    }

    // EMERGENCY FALLBACK: Use Teachers for AM/PM if absolutely necessary
    const stillUnassigned = assignmentQueue.filter(assignment => !assignment.assigned);
    if (stillUnassigned.length > 0) {
      console.warn(`EMERGENCY: ${stillUnassigned.length} sessions need Teacher assignment`);
      
      stillUnassigned.forEach(assignment => {
        const student = students.find(s => s.id === assignment.studentId);
        if (!student) return;
        
        const teacherStaff = staff.filter(member => 
          member.role === 'Teacher' && 
          member.available
        );
        
        const isAM = assignment.sessionType.includes('AM');
        const isPM = assignment.sessionType.includes('PM');
        
        const availableTeachers = teacherStaff.filter(teacher => {
          if (isAM && staffUsage[teacher.id].am) return false;
          if (isPM && staffUsage[teacher.id].pm) return false;
          return true;
        });
        
        if (availableTeachers.length > 0) {
          const selectedTeacher = availableTeachers[0];
          
          const newSession = {
            id: Date.now() + Math.random(),
            studentId: assignment.studentId,
            staffId: selectedTeacher.id,
            sessionType: assignment.sessionType,
            date: selectedDate,
            time: sessionTypes[assignment.sessionType]
          };
          
          newSchedule.push(newSession);
          assignment.assigned = true;
          
          if (isAM) staffUsage[selectedTeacher.id].am = true;
          if (isPM) staffUsage[selectedTeacher.id].pm = true;
          staffUsage[selectedTeacher.id].sessions += 1;
        }
      });
    }

    // LUNCH COVERAGE ASSIGNMENT
    const lunchAssignments = [];
    
    students.forEach(student => {
      // Skip if this student is the secondary member of a pair (lunch is shared)
      if (student.pairedWith && student.id > student.pairedWith) return;
      
      let needsLunch1130 = false;
      let needsLunch1200 = false;

      if (student.lunchSchedule === 'First') {
        needsLunch1130 = true;
        // Check if PM starts at 12:30 (needs 12:00-12:30 coverage)
        const pmSession = newSchedule.find(s => 
          s.studentId === student.id && s.sessionType.includes('PM')
        );
        needsLunch1200 = pmSession && pmSession.sessionType === 'PM (12:30-15:00)';
      } else {
        // Second lunch students
        const amSession = newSchedule.find(s => 
          s.studentId === student.id && s.sessionType.includes('AM')
        );
        needsLunch1130 = !amSession || amSession.sessionType === 'AM Session (8:45-11:30)';
        needsLunch1200 = true;
      }

      // Find available lunch coverage staff (1:3 ratio - one staff can cover up to 3 students/pairs)
      if (needsLunch1130) {
        // First try regular lunch staff (Teachers, BCBAs, unscheduled staff)
        let lunchStaff = staff.filter(member => 
          (member.role === 'Teacher' || member.role === 'BCBA' || !staffUsage[member.id].am) &&
          member.available &&
          !lunchOnlyRoles.includes(member.role) &&
          staffUsage[member.id].lunchCoverage < 3  // Allow up to 3 students per staff
        );
        
        // If no regular staff available, use Directors/Clinical Trainers as last resort
        if (lunchStaff.length === 0) {
          lunchStaff = staff.filter(member => 
            lunchOnlyRoles.includes(member.role) &&
            member.available &&
            staffUsage[member.id].lunchCoverage < 3
          );
          if (lunchStaff.length > 0) {
            console.log(`LUNCH EMERGENCY: Using ${lunchStaff[0].role} ${lunchStaff[0].name} for lunch coverage`);
          }
        }
        
        if (lunchStaff.length > 0) {
          const selectedLunchStaff = lunchStaff[0];
          
          // For 2:1 students, assign exactly 1 staff for lunch (1:1 ratio during lunch)
          // But that staff member becomes dedicated/exclusive to the 2:1 student
          const staffForLunch = [selectedLunchStaff];
          
          staffForLunch.forEach((staffMember, index) => {
            const lunchSession = {
              id: Date.now() + Math.random() + (index * 0.01),
              studentId: student.id,
              pairedStudentId: student.pairedWith || null,
              staffId: staffMember.id,
              sessionType: 'Lunch 1 (11:30-12:00)',
              date: selectedDate,
              time: '11:30-12:00',
              is2to1: student.ratio === '2:1',
              staffCount: staffForLunch.length
            };
            lunchAssignments.push(lunchSession);
            
            // If student is paired, create lunch session for paired student too
            if (student.pairedWith) {
              const pairedLunchSession = {
                id: Date.now() + Math.random() + (index * 0.01) + 0.1,
                studentId: student.pairedWith,
                pairedStudentId: student.id,
                staffId: staffMember.id,
                sessionType: 'Lunch 1 (11:30-12:00)',
                date: selectedDate,
                time: '11:30-12:00',
                is2to1: student.ratio === '2:1',
                staffCount: staffForLunch.length
              };
              lunchAssignments.push(pairedLunchSession);
            }
            
            // For 2:1 students, mark staff as fully occupied (can't cover other students)
            if (student.ratio === '2:1') {
              staffUsage[staffMember.id].lunchCoverage = 3; // Max out their coverage
            } else {
              staffUsage[staffMember.id].lunchCoverage += 1;
            }
          });
        }
      }

      if (needsLunch1200) {
        // First try regular lunch staff (Teachers, BCBAs, unscheduled staff)
        let lunchStaff = staff.filter(member => 
          (member.role === 'Teacher' || member.role === 'BCBA' || !staffUsage[member.id].pm) &&
          member.available &&
          !lunchOnlyRoles.includes(member.role) &&
          staffUsage[member.id].lunchCoverage < 3  // Allow up to 3 students per staff
        );
        
        // If no regular staff available, use Directors/Clinical Trainers as last resort
        if (lunchStaff.length === 0) {
          lunchStaff = staff.filter(member => 
            lunchOnlyRoles.includes(member.role) &&
            member.available &&
            staffUsage[member.id].lunchCoverage < 3
          );
          if (lunchStaff.length > 0) {
            console.log(`LUNCH EMERGENCY: Using ${lunchStaff[0].role} ${lunchStaff[0].name} for lunch coverage`);
          }
        }
        
        if (lunchStaff.length > 0) {
          const selectedLunchStaff = lunchStaff[0];
          
          // For 2:1 students, assign exactly 1 staff for lunch (1:1 ratio during lunch)
          // But that staff member becomes dedicated/exclusive to the 2:1 student
          const staffForLunch = [selectedLunchStaff];
          
          staffForLunch.forEach((staffMember, index) => {
            const lunchSession = {
              id: Date.now() + Math.random() + (index * 0.01),
              studentId: student.id,
              pairedStudentId: student.pairedWith || null,
              staffId: staffMember.id,
              sessionType: 'Lunch 2 (12:00-12:30)',
              date: selectedDate,
              time: '12:00-12:30',
              is2to1: student.ratio === '2:1',
              staffCount: staffForLunch.length
            };
            lunchAssignments.push(lunchSession);
            
            // If student is paired, create lunch session for paired student too
            if (student.pairedWith) {
              const pairedLunchSession = {
                id: Date.now() + Math.random() + (index * 0.01) + 0.1,
                studentId: student.pairedWith,
                pairedStudentId: student.id,
                staffId: staffMember.id,
                sessionType: 'Lunch 2 (12:00-12:30)',
                date: selectedDate,
                time: '12:00-12:30',
                is2to1: student.ratio === '2:1',
                staffCount: staffForLunch.length
              };
              lunchAssignments.push(pairedLunchSession);
            }
            
            // For 2:1 students, mark staff as fully occupied (can't cover other students)
            if (student.ratio === '2:1') {
              staffUsage[staffMember.id].lunchCoverage = 3; // Max out their coverage
            } else {
              staffUsage[staffMember.id].lunchCoverage += 1;
            }
          });
        }
      }
    });

    // Combine all assignments
    const allAssignments = [...newSchedule, ...lunchAssignments];
    setSchedule(allAssignments);
    
    // Generate and set schedule analysis
    const analysis = analyzeSchedule(allAssignments);
    setScheduleAnalysis(analysis);
    setShowAnalysis(true);
    
    // Reset edit mode when new schedule is generated
    setEditMode(false);
    setPendingChanges({});
    
    // Update assignment history for 3-day rule tracking
    const newHistory = allAssignments.map(session => ({
      date: selectedDate,
      studentId: session.studentId,
      staffId: session.staffId,
      sessionType: session.sessionType
    }));
    
    setAssignmentHistory(prev => [...prev, ...newHistory]);
  };

  const getSessionsForDate = () => {
    return schedule.filter(s => s.date === selectedDate);
  };

  const getStaffName = (staffId) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown';
  };

  const getStudentScheduleRow = (student) => {
    const todaySessions = getSessionsForDate();
    const studentSessions = todaySessions.filter(s => s.studentId === student.id);

    const amSession = studentSessions.find(s => 
      s.sessionType === 'AM Session (8:45-11:30)' || s.sessionType === 'AM Session (8:45-12:00)'
    );
    const lunch1 = studentSessions.find(s => s.sessionType === 'Lunch 1 (11:30-12:00)');
    const lunch2 = studentSessions.find(s => s.sessionType === 'Lunch 2 (12:00-12:30)');
    const extendedLunch = studentSessions.find(s => s.sessionType === 'Extended Lunch Coverage (11:30-12:30)');
    const pmSession = studentSessions.find(s => 
      s.sessionType === 'PM (12:00-15:00)' || s.sessionType === 'PM (12:30-15:00)'
    );

    let needsLunch1130 = false;
    let needsLunch1200 = false;

    if (student.lunchSchedule === 'First') {
      if (extendedLunch) {
        needsLunch1130 = false;
        needsLunch1200 = false;
      } else {
        needsLunch1130 = true;
        needsLunch1200 = pmSession && pmSession.sessionType === 'PM (12:30-15:00)';
      }
    } else {
      needsLunch1130 = !amSession || amSession.sessionType === 'AM Session (8:45-11:30)';
      needsLunch1200 = !pmSession || pmSession.sessionType === 'PM (12:30-15:00)';
    }

    const getSessionDisplay = (session, includeTime = true) => {
      if (!session) return 'NEEDED';
      
      // Handle pending changes
      const effectiveStaffId = pendingChanges[session.id] ? parseInt(pendingChanges[session.id]) : session.staffId;
      const staffMember = staff.find(s => s.id === effectiveStaffId);
      
      // Handle paired students - show both names
      let studentDisplay = student.name;
      if (session.pairedStudentId) {
        const pairedStudent = students.find(s => s.id === session.pairedStudentId);
        if (pairedStudent) {
          // Show names in consistent order (lower ID first)
          if (session.studentId < session.pairedStudentId) {
            studentDisplay = `${student.name}/${pairedStudent.name}`;
          } else {
            studentDisplay = `${pairedStudent.name}/${student.name}`;
          }
        }
      }
      
      // Handle 2:1 students - get all staff for this student/session
      let staffDisplay = '';
      if (session.is2to1) {
        const allSessionsForStudent = getSessionsForDate().filter(s => 
          s.studentId === session.studentId && 
          s.sessionType === session.sessionType
        );
        const staffNames = allSessionsForStudent.map(s => {
          const staffMember = staff.find(sm => sm.id === s.staffId);
          return staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown';
        });
        staffDisplay = staffNames.join(' + ');
      } else {
        staffDisplay = staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown';
      }
      
      if (!includeTime) return session.is2to1 ? `${staffDisplay} (${studentDisplay})` : staffDisplay;
      
      let timeDisplay = '';
      if (session.sessionType.includes('AM Session')) {
        timeDisplay = session.sessionType.includes('12:00') ? '(12:00)' : '(11:30)';
      } else if (session.sessionType.includes('PM')) {
        timeDisplay = session.sessionType.includes('12:30') ? '(12:30)' : '(12:00)';
      }
      
      return `${staffDisplay} ${timeDisplay}`;
    };

    const renderSessionCell = (session, needed, timeIncluded = true) => {
      if (!needed) {
        return {
          display: 'X',
          class: 'bg-gray-100 text-gray-500'
        };
      }
      
      if (!session) {
        return {
          display: 'NEEDED',
          class: session && session.sessionType.includes('Lunch') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        };
      }

      // Use green for lunch sessions, blue for AM/PM sessions
      const isLunchSession = session.sessionType.includes('Lunch');
      const baseClass = pendingChanges[session.id] 
        ? 'bg-orange-100 text-orange-700 border border-orange-300' 
        : isLunchSession 
          ? 'bg-green-100 text-green-700' 
          : 'bg-blue-100 text-blue-700';
      
      if (editMode && (session.sessionType.includes('AM') || session.sessionType.includes('PM'))) {
        const eligibleStaff = getEligibleStaff(session.id);
        return {
          display: (
            <select
              value={pendingChanges[session.id] || session.staffId}
              onChange={(e) => handleAssignmentChange(session.id, e.target.value)}
              className="text-xs p-1 rounded border bg-white w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {eligibleStaff.map(member => (
                <option key={member.id} value={member.id}>
                  {member.role} {member.name}
                  {student.teamStaff.includes(member.name) ? ' ⭐' : ''}
                </option>
              ))}
            </select>
          ),
          class: baseClass
        };
      }

      return {
        display: getSessionDisplay(session, timeIncluded),
        class: baseClass
      };
    };

    const amCell = renderSessionCell(amSession, true);
    const lunch1Cell = renderSessionCell(lunch1 || extendedLunch, needsLunch1130, false);
    const lunch2Cell = renderSessionCell(lunch2 || extendedLunch, needsLunch1200, false);
    const pmCell = renderSessionCell(pmSession, true);

    return {
      student,
      amDisplay: amCell.display,
      lunch1Display: lunch1Cell.display,
      lunch2Display: lunch2Cell.display,
      pmDisplay: pmCell.display,
      amClass: amCell.class,
      lunch1Class: lunch1Cell.class,
      lunch2Class: lunch2Cell.class,
      pmClass: pmCell.class
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ABA Daily Schedule - All Students</h2>
            <div className="flex gap-4 items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 border rounded-md"
              />
              <button
                onClick={clearSchedule}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Clear Schedule
              </button>
              <button
                onClick={autoAssignSessions}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Auto-Assign Sessions
              </button>
              
              {/* Edit Mode Toggle */}
              {schedule.length > 0 && !editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Edit3 size={16} />
                  Edit Assignments
                </button>
              )}
              
              {/* Edit Mode Controls */}
              {editMode && (
                <div className="flex gap-2">
                  <button
                    onClick={applyChanges}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
              
              {/* Export CSV Button */}
              <button
                onClick={exportToCSV}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  schedule.length > 0 
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                disabled={schedule.length === 0}
                title={schedule.length === 0 ? 'Run Auto-Assign first to export' : ''}
              >
                <Download size={16} />
                Export CSV
              </button>
              
              <button
                onClick={() => {
                  console.log('Analysis button clicked. scheduleAnalysis:', scheduleAnalysis, 'showAnalysis:', showAnalysis);
                  setShowAnalysis(!showAnalysis);
                }}
                className={`px-4 py-2 rounded-md transition-colors ${
                  scheduleAnalysis 
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                disabled={!scheduleAnalysis}
                title={!scheduleAnalysis ? 'Run Auto-Assign first to see analysis' : ''}
              >
                {showAnalysis ? 'Hide Analysis' : 'Staff Analysis'}
              </button>
              <button
                onClick={() => setShowStaffManager(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Manage Staff
              </button>
              <button
                onClick={() => setShowTeamManager(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
              >
                Manage Teams
              </button>
            </div>
          </div>

          {/* Edit Mode Banner */}
          {editMode && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">✏️ Edit Mode Active</h3>
              <div className="text-sm text-yellow-700 space-y-1">
                <div>• Use dropdowns in AM/PM columns to reassign staff</div>
                <div>• Staff marked with ⭐ are team members (preferred)</div>
                <div>• Dropdowns show only eligible staff (no conflicts)</div>
                <div>• Orange highlighting indicates pending changes</div>
                <div>• Click "Save Changes" to apply or "Cancel" to discard</div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Enhanced Assignment Algorithm - 6-Pass Constraint Relaxation</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div><strong>Priority Cascade:</strong> RBT → BS → EA → MHA → BCBA → CC → Teacher (emergency)</div>
              <div><strong>Pass 1:</strong> All constraints (3-day rule + all specialist limits)</div>
              <div><strong>Pass 2:</strong> Relax BS limits only (BS can work multiple sessions)</div>
              <div><strong>Pass 3:</strong> Relax 3-day rule, keep EA/MHA/BCBA limits</div>
              <div><strong>Pass 4:</strong> Relax EA/MHA/BCBA limits, restore 3-day rule</div>
              <div><strong>Pass 5:</strong> Relax all constraints except basic conflicts</div>
              <div><strong>Pass 6:</strong> Emergency Teacher assignment if needed</div>
              <div><strong>REQUIRED:</strong> All students MUST have both AM & PM sessions assigned</div>
              <div><strong>Lunch Coverage:</strong> Teachers + unscheduled staff (1:3 ratio)</div>
              <div><strong>Available Staff:</strong> {staff.filter(s => s.available).length}/{staff.length} • <strong>Students:</strong> {students.length}</div>
            </div>
          </div>

          {scheduleAnalysis && showAnalysis && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-cyan-800 mb-4">📊 Schedule Analysis & Unassigned Staff</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* AM Session Analysis */}
                <div className="bg-white rounded-lg p-4 border border-cyan-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    AM Sessions (8:45-11:30/12:00) 
                    <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {scheduleAnalysis.utilization?.AM || 0}% Utilized
                    </span>
                  </h4>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Assigned: {scheduleAnalysis.totalAssigned?.AM || 0} • 
                      Unassigned: {scheduleAnalysis.unassignedAM?.length || 0} • 
                      Total Available: {scheduleAnalysis.totalAvailable || 0}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Assignments by Role:</span>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
                        <span>RBT: {scheduleAnalysis.roleAssignments?.AM?.RBT || 0}</span>
                        <span>BS: {scheduleAnalysis.roleAssignments?.AM?.BS || 0}</span>
                        <span>EA: {scheduleAnalysis.roleAssignments?.AM?.EA || 0}</span>
                        <span>MHA: {scheduleAnalysis.roleAssignments?.AM?.MHA || 0}</span>
                        <span>BCBA: {scheduleAnalysis.roleAssignments?.AM?.BCBA || 0}</span>
                        <span>CC: {scheduleAnalysis.roleAssignments?.AM?.CC || 0}</span>
                      </div>
                    </div>
                    
                    {scheduleAnalysis.unassignedAM && scheduleAnalysis.unassignedAM.length > 0 && (
                      <div>
                        <span className="font-medium text-red-700">Unassigned Staff ({scheduleAnalysis.unassignedAM.length}):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scheduleAnalysis.unassignedAM.map(member => (
                            <span key={member.id} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                              {member.role} {member.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {(!scheduleAnalysis.unassignedAM || scheduleAnalysis.unassignedAM.length === 0) && (
                      <div className="text-green-700 font-medium text-sm">✓ All available staff assigned!</div>
                    )}
                  </div>
                </div>

                {/* PM Session Analysis */}
                <div className="bg-white rounded-lg p-4 border border-cyan-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    PM Sessions (12:00/12:30-15:00)
                    <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {scheduleAnalysis.utilization?.PM || 0}% Utilized
                    </span>
                  </h4>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Assigned: {scheduleAnalysis.totalAssigned?.PM || 0} • 
                      Unassigned: {scheduleAnalysis.unassignedPM?.length || 0} • 
                      Total Available: {scheduleAnalysis.totalAvailable || 0}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Assignments by Role:</span>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-xs">
                        <span>RBT: {scheduleAnalysis.roleAssignments?.PM?.RBT || 0}</span>
                        <span>BS: {scheduleAnalysis.roleAssignments?.PM?.BS || 0}</span>
                        <span>EA: {scheduleAnalysis.roleAssignments?.PM?.EA || 0}</span>
                        <span>MHA: {scheduleAnalysis.roleAssignments?.PM?.MHA || 0}</span>
                        <span>BCBA: {scheduleAnalysis.roleAssignments?.PM?.BCBA || 0}</span>
                        <span>CC: {scheduleAnalysis.roleAssignments?.PM?.CC || 0}</span>
                      </div>
                    </div>
                    
                    {scheduleAnalysis.unassignedPM && scheduleAnalysis.unassignedPM.length > 0 && (
                      <div>
                        <span className="font-medium text-red-700">Unassigned Staff ({scheduleAnalysis.unassignedPM.length}):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scheduleAnalysis.unassignedPM.map(member => (
                            <span key={member.id} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                              {member.role} {member.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {(!scheduleAnalysis.unassignedPM || scheduleAnalysis.unassignedPM.length === 0) && (
                      <div className="text-green-700 font-medium text-sm">✓ All available staff assigned!</div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Summary Statistics */}
              <div className="bg-white rounded-lg p-3 border border-cyan-200">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Capacity Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg text-blue-600">{scheduleAnalysis.totalAvailable || 0}</div>
                    <div className="text-gray-600">Available Staff</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">{scheduleAnalysis.totalAssigned?.AM || 0}</div>
                    <div className="text-gray-600">AM Assigned</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">{scheduleAnalysis.totalAssigned?.PM || 0}</div>
                    <div className="text-gray-600">PM Assigned</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-orange-600">
                      {Math.max(
                        scheduleAnalysis.unassignedAM?.length || 0, 
                        scheduleAnalysis.unassignedPM?.length || 0
                      )}
                    </div>
                    <div className="text-gray-600">Max Unassigned</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border rounded-lg overflow-hidden shadow">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">STUDENT</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">AM SESSION<br/><span className="text-xs font-normal text-gray-500">8:45-11:30/12:00</span></th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">11:30-12:00<br/><span className="text-xs font-normal text-gray-500">First Lunch</span></th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">12:00-12:30<br/><span className="text-xs font-normal text-gray-500">Second Lunch</span></th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">PM SESSION<br/><span className="text-xs font-normal text-gray-500">12:00/12:30-15:00</span></th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">TEAM STAFF</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const rowData = getStudentScheduleRow(student);
                    
                    return (
                      <tr key={student.id} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">
                            {student.ratio} • {student.lunchSchedule} Lunch
                          </div>
                        </td>
                        <td className={`px-4 py-3 text-center text-sm font-medium rounded-md mx-1 ${rowData.amClass}`}>
                          {rowData.amDisplay}
                        </td>
                        <td className={`px-4 py-3 text-center text-sm font-medium rounded-md mx-1 ${rowData.lunch1Class}`}>
                          {rowData.lunch1Display}
                        </td>
                        <td className={`px-4 py-3 text-center text-sm font-medium rounded-md mx-1 ${rowData.lunch2Class}`}>
                          {rowData.lunch2Display}
                        </td>
                        <td className={`px-4 py-3 text-center text-sm font-medium rounded-md mx-1 ${rowData.pmClass}`}>
                          {rowData.pmDisplay}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-gray-600 max-w-xs">
                            {student.teamStaff.slice(0, 8).join(', ')}
                            {student.teamStaff.length > 8 && ` +${student.teamStaff.length - 8} more`}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-6 text-sm mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-gray-600">AM/PM Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-gray-600">Lunch Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span className="text-gray-600">Coverage Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-gray-600">Assignment Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
              <span className="text-gray-600">Pending Change</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
              <span className="text-gray-600">X = Student at lunch</span>
            </div>
          </div>

          {showStaffManager && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowStaffManager(false)}
            >
              <div 
                className="bg-white rounded-lg shadow-xl border w-full max-w-4xl"
                style={{ height: '80vh', maxHeight: '600px' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Fixed Header */}
                <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
                  <h3 className="text-xl font-semibold">Manage Staff Availability</h3>
                  <button 
                    onClick={() => setShowStaffManager(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div 
                  className="px-6 py-4"
                  style={{ 
                    height: 'calc(80vh - 140px)', 
                    maxHeight: 'calc(600px - 140px)', 
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {staff.map(staffMember => (
                      <button
                        key={staffMember.id}
                        onClick={() => toggleStaffAvailability(staffMember.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                          staffMember.available 
                            ? 'bg-green-50 border-green-300 text-green-800 hover:bg-green-100' 
                            : 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100'
                        }`}
                      >
                        <div className="font-medium">{staffMember.name}</div>
                        <div className="text-sm opacity-75">{staffMember.role}</div>
                        <div className={`text-xs font-semibold mt-1 ${
                          staffMember.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {staffMember.available ? '✓ AVAILABLE' : '✗ UNAVAILABLE'}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Staff Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium">Total Staff:</span> {staff.length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-green-700">Available:</span> {staff.filter(s => s.available).length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-red-700">Unavailable:</span> {staff.filter(s => !s.available).length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-purple-700">RBT:</span> {staff.filter(s => s.role === 'RBT').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-blue-700">BCBA:</span> {staff.filter(s => s.role === 'BCBA').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-indigo-700">BS:</span> {staff.filter(s => s.role === 'BS').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-cyan-700">EA:</span> {staff.filter(s => s.role === 'EA').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-teal-700">MHA:</span> {staff.filter(s => s.role === 'MHA').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-amber-700">CC:</span> {staff.filter(s => s.role === 'CC').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-emerald-700">Teacher:</span> {staff.filter(s => s.role === 'Teacher').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-pink-700">Director:</span> {staff.filter(s => s.role === 'Director').length}
                      </div>
                      <div className="bg-white p-2 rounded border">
                        <span className="font-medium text-violet-700">Clinical Trainer:</span> {staff.filter(s => s.role === 'Clinical Trainer').length}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Fixed Footer */}
                <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
                  <p className="text-sm text-gray-600">Scroll to see all staff • Click outside to close</p>
                  <button 
                    onClick={() => setShowStaffManager(false)}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {showTeamManager && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowTeamManager(false)}
            >
              <div 
                className="bg-white rounded-lg shadow-xl border w-full max-w-6xl"
                style={{ height: '85vh', maxHeight: '700px' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Fixed Header */}
                <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
                  <h3 className="text-xl font-semibold">Manage Student Teams</h3>
                  <button 
                    onClick={() => setShowTeamManager(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div 
                  className="px-6 py-4"
                  style={{ 
                    height: 'calc(85vh - 140px)', 
                    maxHeight: 'calc(700px - 140px)', 
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {students
                      .sort((a, b) => a.name.localeCompare(b.name)) // Sort students alphabetically by name
                      .map(student => (
                      <div key={student.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="mb-3">
                          <h4 className="font-semibold text-lg text-gray-800">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.ratio} • {student.lunchSchedule} Lunch</p>
                        </div>
                        
                        <div className="mb-3">
                          <p className="font-medium text-sm text-gray-700 mb-2">Current Team ({student.teamStaff.length} staff):</p>
                          <div className="flex flex-wrap gap-1 min-h-[2rem]">
                            {student.teamStaff.map(staffName => (
                              <span 
                                key={staffName}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                              >
                                {staffName}
                                <button
                                  onClick={() => removeStaffFromTeam(student.id, staffName)}
                                  className="hover:bg-blue-200 rounded px-1"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {student.teamStaff.length === 0 && (
                              <span className="text-gray-400 text-sm italic">No team members assigned</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-700 mb-2">Add Staff ({staff.filter(s => s.available && !student.teamStaff.includes(s.name)).length} available):</p>
                          <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
                            {staff
                              .filter(s => s.available && !student.teamStaff.includes(s.name))
                              .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
                              .map(staffMember => (
                              <button
                                key={staffMember.id}
                                onClick={() => addStaffToTeam(student.id, staffMember.name)}
                                className="text-left px-2 py-1 text-xs bg-gray-100 hover:bg-green-100 border rounded transition-colors"
                              >
                                {staffMember.role} {staffMember.name}
                              </button>
                            ))}
                            {staff.filter(s => s.available && !student.teamStaff.includes(s.name)).length === 0 && (
                              <div className="col-span-2 text-gray-400 text-sm italic p-2">
                                All available staff are already on this team
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fixed Footer */}
                <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
                  <p className="text-sm text-gray-600">Scroll to see all students • Click outside to close</p>
                  <button 
                    onClick={() => setShowTeamManager(false)}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ABAScheduler;