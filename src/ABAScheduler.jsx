  // Fisher-Yates shuffle utility for variety
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
import React, { useState } from 'react';
import { Plus, Download, Edit3, Save, X } from 'lucide-react';

const ABAScheduler = () => {
  const [staff, setStaff] = useState([
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
  const [assignmentHistory, setAssignmentHistory] = useState([]);
  const [scheduleAnalysis, setScheduleAnalysis] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAttendanceManager, setShowAttendanceManager] = useState(false);
  
  // New states for manual assignment
  const [editMode, setEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});
  
  // Attendance tracking - key format: "studentId-date"
  const [studentAttendance, setStudentAttendance] = useState({});
  
  // Lunch overrides - key format: "studentId-date-lunchType" (e.g., "1-2024-01-15-lunch1")
  const [lunchOverrides, setLunchOverrides] = useState({});
  
  // Assignment rotation tracking - key format: "studentId-staffId", value: array of recent dates
  const [recentAssignments, setRecentAssignments] = useState({});
  
  // Team staff display expansion tracking
  const [expandedTeams, setExpandedTeams] = useState(new Set());
  
  // Pending BCBA assignments that need manual selection
  const [pendingBCBAAssignments, setPendingBCBAAssignments] = useState([]);
  
  // Additional modal states
  const [showStaffManager, setShowStaffManager] = useState(false);
  const [showTeamManager, setShowTeamManager] = useState(false);

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
  const lunchOnlyRoles = ['Director', 'Clinical Trainer'];

  const getStaffByName = (name) => {
    return staff.find(s => s.name === name);
  };

  // Attendance management functions
  const getAttendanceKey = (studentId, date) => `${studentId}-${date}`;
  
  const getStudentAttendance = (studentId, date) => {
    return studentAttendance[getAttendanceKey(studentId, date)] || 'present';
  };
  
  const setStudentAttendanceState = (studentId, date, status) => {
    const key = getAttendanceKey(studentId, date);
    setStudentAttendance(prev => ({
      ...prev,
      [key]: status
    }));
    
    console.log(`${students.find(s => s.id === studentId)?.name} attendance set to: ${status} for ${date}`);
  };
  
  const isStudentAbsent = (studentId, sessionType, date) => {
    const attendance = getStudentAttendance(studentId, date);
    if (attendance === 'present') return false;
    if (attendance === 'absent_full') return true;
    if (attendance === 'absent_am' && sessionType.includes('AM')) return true;
    if (attendance === 'absent_pm' && sessionType.includes('PM')) return true;
    return false;
  };

  // Lunch override functions
  const getLunchOverrideKey = (studentId, date, lunchType) => `${studentId}-${date}-${lunchType}`;
  
  const hasLunchOverride = (studentId, date, lunchType) => {
    const key = getLunchOverrideKey(studentId, date, lunchType);
    return lunchOverrides[key] === 'no_coverage';
  };
  
  const setLunchOverride = (studentId, date, lunchType, override) => {
    const key = getLunchOverrideKey(studentId, date, lunchType);
    setLunchOverrides(prev => ({
      ...prev,
      [key]: override
    }));
  };

  // Assignment variety functions
  const getRecentAssignmentKey = (studentId, staffId) => `${studentId}-${staffId}`;
  
  const addRecentAssignment = (studentId, staffId, date) => {
    const key = getRecentAssignmentKey(studentId, staffId);
    setRecentAssignments(prev => {
      const currentAssignments = prev[key] || [];
      const updatedAssignments = [date, ...currentAssignments].slice(0, 5);
      return { ...prev, [key]: updatedAssignments };
    });
  };
  
  const getDaysSinceLastAssignment = (studentId, staffId, currentDate) => {
    const key = getRecentAssignmentKey(studentId, staffId);
    const assignments = recentAssignments[key];
    if (!assignments || assignments.length === 0) return 999;
    
    const lastAssignment = assignments[0];
    const daysDiff = Math.floor((new Date(currentDate) - new Date(lastAssignment)) / (1000 * 60 * 60 * 24));
    return daysDiff;
  };
  
  const addVarietyScore = (candidateStaff, studentId, currentDate) => {
    return candidateStaff.map(member => {
      const daysSince = getDaysSinceLastAssignment(studentId, member.id, currentDate);
      const varietyScore = Math.min(daysSince / 3, 10);
      return { ...member, varietyScore, daysSince };
    });
  };

  // Team staff display functions
  const toggleTeamExpansion = (studentId) => {
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
    const teamStaff = student.teamStaff;
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
          <>
            {teamStaff.join(', ')}{' '}
            <button
              onClick={() => toggleTeamExpansion(student.id)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              show less
            </button>
          </>
        </div>
      );
    }
    
    const displayedStaff = teamStaff.slice(0, maxDisplay);
    const remainingCount = teamStaff.length - maxDisplay;
    
    return (
      <div className="text-xs text-gray-600 max-w-xs">
        {displayedStaff.join(', ')}{' '}
        <button
          onClick={() => toggleTeamExpansion(student.id)}
          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          +{remainingCount} more
        </button>
      </div>
    );
  };

  // BCBA manual assignment functions
  const createPendingBCBAAssignment = (studentId, sessionType, date, time) => {
    const pendingId = `pending_${studentId}_${sessionType.replace(/\s+/g, '_')}_${Date.now()}`;
    const newPending = {
      id: pendingId,
      studentId,
      sessionType,
      date,
      time,
      availableBCBAs: staff.filter(s => s.role === 'BCBA' && s.available)
    };
    
    setPendingBCBAAssignments(prev => [...prev, newPending]);
    console.log(`⚠️ BCBA NEEDED: Manual selection required for ${students.find(s => s.id === studentId)?.name} - ${sessionType}`);
    return pendingId;
  };

  const assignSelectedBCBA = (pendingId, selectedBCBAId) => {
    if (!selectedBCBAId) return; // Prevent empty selections
    
    const pending = pendingBCBAAssignments.find(p => p.id === pendingId);
    if (!pending) {
      console.error('Pending BCBA assignment not found:', pendingId);
      return;
    }

    const bcbaId = parseInt(selectedBCBAId);
    const bcba = staff.find(s => s.id === bcbaId);
    if (!bcba) {
      console.error('BCBA not found:', selectedBCBAId);
      return;
    }

    console.log(`🔄 ASSIGNING BCBA: ${bcba.name} to ${students.find(s => s.id === pending.studentId)?.name} - ${pending.sessionType}`);

    const newSession = {
      id: Date.now() + Math.random(),
      studentId: pending.studentId,
      staffId: bcbaId,
      sessionType: pending.sessionType,
      date: pending.date,
      time: pending.time,
      manualBCBAAssignment: true
    };

    // Determine if this is AM or PM session for conflict detection
    const isAMSession = pending.sessionType.includes('AM');
    const isPMSession = pending.sessionType.includes('PM');

    // Update states in the correct order to prevent timing issues
    setSchedule(prev => [...prev, newSession]);
    
    // Remove the assigned pending BCBA and update conflicts in one operation
    setPendingBCBAAssignments(prev => {
      const updated = prev.map(p => {
        if (p.id === pendingId) {
          return null; // Mark for removal
        }
        const otherIsAM = p.sessionType.includes('AM');
        const otherIsPM = p.sessionType.includes('PM');
        // Remove BCBA from conflicting time slots
        if ((isAMSession && otherIsAM) || (isPMSession && otherIsPM)) {
          return null;
        }
        return p;
      }).filter(p => p !== null); // Remove the assigned one
      console.log(`✅ BCBA ASSIGNED: ${bcba.name} → Remaining pending: ${updated.length}`);
      return updated;
    });
  };

  // Staff and Team Management Functions
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
      'Session Type',
      'Time',
      'Staff Name',
      'Staff Role'
    ];

    const rows = schedule.map(session => {
      const student = students.find(s => s.id === session.studentId);
      const staffMember = staff.find(s => s.id === session.staffId);
      
      return [
        session.date,
        student?.name || 'Unknown',
        student?.ratio || 'Unknown',
        session.sessionType,
        session.time,
        staffMember?.name || 'Unknown',
        staffMember?.role || 'Unknown'
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
    setPendingBCBAAssignments([]);
    console.log('Schedule cleared for', selectedDate);
  };

  const analyzeSchedule = (sessions) => {
    const availableStaff = staff.filter(s => s.available);
    const amAssignments = new Set();
    const pmAssignments = new Set();
    
    sessions.forEach(session => {
      if (session.sessionType.includes('AM Session')) {
        amAssignments.add(session.staffId);
      } else if (session.sessionType.includes('PM')) {
        pmAssignments.add(session.staffId);
      }
    });
    
    const unassignedAM = availableStaff.filter(member => 
      !amAssignments.has(member.id) && member.role !== 'Teacher'
    );
    
    const unassignedPM = availableStaff.filter(member => 
      !pmAssignments.has(member.id) && member.role !== 'Teacher'
    );
    
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
    
    const totalAvailableStaff = availableStaff.filter(s => s.role !== 'Teacher').length;
    const amUtilization = totalAvailableStaff > 0 ? ((totalAvailableStaff - unassignedAM.length) / totalAvailableStaff * 100).toFixed(1) : 0;
    const pmUtilization = totalAvailableStaff > 0 ? ((totalAvailableStaff - unassignedPM.length) / totalAvailableStaff * 100).toFixed(1) : 0;
    
    return {
      unassignedAM,
      unassignedPM,
      roleAssignments,
      utilization: { AM: amUtilization, PM: pmUtilization },
      totalAssigned: { AM: totalAvailableStaff - unassignedAM.length, PM: totalAvailableStaff - unassignedPM.length },
      totalAvailable: totalAvailableStaff
    };
  };

  const autoAssignSessions = () => {
    const newSchedule = [];
    const assignmentQueue = [];
    
    // Clear existing pending BCBA assignments
    setPendingBCBAAssignments([]);
    
    // Calculate caseload sizes for each staff member
    const staffCaseloads = {};
    staff.forEach(member => {
      const studentCount = students.filter(student => 
        student.teamStaff.includes(member.name)
      ).length;
      staffCaseloads[member.name] = studentCount;
    });
    
    console.log('BCBA Manual Selection System: Creating pending assignments for BCBA coverage needs');
    
    // Create assignment queue with PRIORITY BASED ON TEAM SIZE
    const processedPairs = new Set();
    
    students.forEach(student => {
      if (processedPairs.has(student.id)) return;
      
      const amSessionType = student.lunchSchedule === 'First' 
        ? 'AM Session (8:45-11:30)'
        : 'AM Session (8:45-12:00)';

      const pmSessionType = student.lunchSchedule === 'First'
        ? 'PM (12:00-15:00)'
        : 'PM (12:30-15:00)';

      const teamSize = student.teamStaff.length;
      
      const isPaired = student.pairedWith !== undefined;
      let pairedStudent = null;
      
      if (isPaired) {
        pairedStudent = students.find(s => s.id === student.pairedWith);
        if (pairedStudent) {
          processedPairs.add(student.id);
          processedPairs.add(pairedStudent.id);
          
          if (student.lunchSchedule !== pairedStudent.lunchSchedule) {
            console.warn(`Paired students ${student.name} and ${pairedStudent.name} have different lunch schedules!`);
          }
        }
      }
      
      const requires2to1 = student.ratio === '2:1';
      
      if (!isStudentAbsent(student.id, amSessionType, selectedDate)) {
        assignmentQueue.push({
          studentId: student.id,
          pairedStudentId: isPaired ? student.pairedWith : null,
          sessionType: amSessionType,
          priority: teamSize,
          assigned: false,
          isPaired: isPaired,
          requires2to1: requires2to1,
          staffAssignments: []
        });
      }
      
      if (!isStudentAbsent(student.id, pmSessionType, selectedDate)) {
        assignmentQueue.push({
          studentId: student.id,
          pairedStudentId: isPaired ? student.pairedWith : null,
          sessionType: pmSessionType,
          priority: teamSize,
          assigned: false,
          isPaired: isPaired,
          requires2to1: requires2to1,
          staffAssignments: []
        });
      }
    });

    // SORT BY PRIORITY: Clinical complexity first, then team constraints
    assignmentQueue.sort((a, b) => {
      const studentA = students.find(s => s.id === a.studentId);
      const studentB = students.find(s => s.id === b.studentId);
      
      if (studentA.ratio === '2:1' && studentB.ratio !== '2:1') return -1;
      if (studentB.ratio === '2:1' && studentA.ratio !== '2:1') return 1;
      
      const teamSizeA = studentA.teamStaff.length;
      const teamSizeB = studentB.teamStaff.length;
      
      const avgCaseloadA = studentA.teamStaff.reduce((sum, staffName) => {
        return sum + (staffCaseloads[staffName] || 0);
      }, 0) / teamSizeA;
      
      const avgCaseloadB = studentB.teamStaff.reduce((sum, staffName) => {
        return sum + (staffCaseloads[staffName] || 0);
      }, 0) / teamSizeB;
      
      if (Math.abs(avgCaseloadA - avgCaseloadB) < 1) {
        if (teamSizeA !== teamSizeB) {
          return teamSizeA - teamSizeB;
        }
        return a.studentId - b.studentId;
      }
      
      return avgCaseloadA - avgCaseloadB;
    });

    // Track staff usage
    const staffUsage = {};
    staff.forEach(member => {
      staffUsage[member.id] = { am: false, pm: false, sessions: 0, lunchCoverage: 0 };
    });

    // MAIN ASSIGNMENT ALGORITHM with BCBA MANUAL SELECTION
    for (let pass = 1; pass <= 15; pass++) {
      console.log(`Assignment Pass ${pass}:`);
      
      const useSpecialistEmergencyMode = pass >= 8;
      
      staffPriority.forEach(roleType => {
        assignmentQueue.forEach(assignment => {
          if (assignment.assigned) return;
          
          const student = students.find(s => s.id === assignment.studentId);
          if (!student) return;
          
          let candidateStaff;
          
          if (useSpecialistEmergencyMode && specialistRoles.includes(roleType)) {
            candidateStaff = staff.filter(member => 
              member.role === roleType &&
              member.available &&
              !lunchOnlyRoles.includes(member.role)
            );
            // Shuffle for variety
            candidateStaff = shuffleArray(candidateStaff);
            if (candidateStaff.length > 0) {
              console.log(`Pass ${pass} SPECIALIST EMERGENCY: Found ${candidateStaff.length} available ${roleType}s for ${student.name} (team size: ${student.teamStaff.length})`);
            }
          } else {
            candidateStaff = student.teamStaff
              .map(name => getStaffByName(name))
              .filter(member => 
                member && 
                member.role === roleType &&
                member.available &&
                !lunchOnlyRoles.includes(member.role)
              );
            // Shuffle for variety
            candidateStaff = shuffleArray(candidateStaff);
          }
          
          candidateStaff = candidateStaff.filter(member => {
            const isAM = assignment.sessionType.includes('AM');
            const isPM = assignment.sessionType.includes('PM');
            
            if (isAM && staffUsage[member.id].am) return false;
            if (isPM && staffUsage[member.id].pm) return false;
            
            const studentExistingSessions = newSchedule.filter(s => s.studentId === assignment.studentId);
            const hasConflictWithSameStudent = studentExistingSessions.some(existingSession => {
              const existingIsAM = existingSession.sessionType.includes('AM');
              const existingIsPM = existingSession.sessionType.includes('PM');
              
              return existingSession.staffId === member.id && 
                     ((isAM && existingIsPM) || (isPM && existingIsAM));
            });
            
            if (hasConflictWithSameStudent) return false;
            
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
            
            if (pass === 1) {
              if (!checkThreeDayRule(assignment.studentId, member.id, selectedDate)) return false;
              if (specialistRoles.includes(member.role) && staffUsage[member.id].sessions >= 1) return false;
            } 
            else if (pass === 2) {
              if (!checkThreeDayRule(assignment.studentId, member.id, selectedDate)) return false;
              if (['EA', 'MHA', 'BCBA'].includes(member.role) && staffUsage[member.id].sessions >= 1) return false;
            }
            else if (pass === 3) {
              if (['EA', 'MHA', 'BCBA'].includes(member.role) && staffUsage[member.id].sessions >= 1) return false;
            }
            else if (pass === 4) {
              if (!checkThreeDayRule(assignment.studentId, member.id, selectedDate)) return false;
            }
            
            return true;
          });
          
          // *** BCBA MANUAL SELECTION FIX: Check if BCBA assignment needed ***
          if (roleType === 'BCBA' && candidateStaff.length > 0) {
            // Instead of assigning directly, create pending BCBA assignment for manual selection
            const pendingId = createPendingBCBAAssignment(
              assignment.studentId, 
              assignment.sessionType, 
              selectedDate, 
              sessionTypes[assignment.sessionType]
            );
            
            // Mark as "assigned" to remove from queue, but no actual session created yet
            assignment.assigned = true;
            assignment.pendingBCBAId = pendingId; // Track the pending assignment
            
            // Handle paired students - they share the same BCBA assignment
            if (assignment.isPaired && assignment.pairedStudentId) {
              const pairedAssignment = assignmentQueue.find(a => 
                a.studentId === assignment.pairedStudentId && 
                a.sessionType === assignment.sessionType &&
                !a.assigned
              );
              if (pairedAssignment) {
                pairedAssignment.assigned = true;
                pairedAssignment.pendingBCBAId = pendingId; // Same pending assignment
              }
            }
            
            console.log(`Pass ${pass}: ⚠️ BCBA MANUAL SELECTION REQUIRED - ${student.name} - ${assignment.sessionType} (Pending ID: ${pendingId})`);
            return; // Skip normal assignment logic for BCBAs
          }
          
          // Assign if candidate found (NON-BCBA assignments)
          if (candidateStaff.length > 0 && roleType !== 'BCBA') {
            // Add variety scoring to promote rotation
            const staffWithVariety = addVarietyScore(candidateStaff, assignment.studentId, selectedDate);
            
            // PRIORITIZE STAFF WITH VARIETY AND SMALLER CASELOADS
            staffWithVariety.sort((a, b) => {
              const caseloadA = staffCaseloads[a.name] || 0;
              const caseloadB = staffCaseloads[b.name] || 0;
              
              // Variety bonus (0-10) + caseload penalty (weighted)
              const scoreA = a.varietyScore - (caseloadA * 0.3);
              const scoreB = b.varietyScore - (caseloadB * 0.3);
              
              // Higher score = better choice (more variety, smaller caseload)
              if (Math.abs(scoreA - scoreB) > 0.5) {
                return scoreB - scoreA; // Sort by score descending
              }
              
              // If scores are very close, add small random factor for variety
              return Math.random() - 0.5;
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
      
      if (remainingUnassigned === 0) {
        console.log(`✅ ALL SESSIONS ASSIGNED after Pass ${pass} using priority-based assignment!`);
        break;
      }
      
      if (pass === 15 && remainingUnassigned > 0) {
        console.warn(`⚠️ CRITICAL: ${remainingUnassigned} sessions could not be assigned after 15 passes!`);
      }
    }

    // COMPLETELY REWRITTEN LUNCH COVERAGE LOGIC
    console.log('Starting lunch coverage assignment...');
    const lunchAssignments = [];
    
    // Reset lunch coverage tracking
    staff.forEach(member => {
      staffUsage[member.id].lunchCoverage = 0;
    });
    
    // Create a map to track which students actually need which lunch periods
    const studentLunchNeeds = {};
    
    students.forEach(student => {
      const isAbsentFull = getStudentAttendance(student.id, selectedDate) === 'absent_full';
      const isAbsentAM = isStudentAbsent(student.id, 'AM Session', selectedDate);
      const isAbsentPM = isStudentAbsent(student.id, 'PM Session', selectedDate);
      
      // Find the student's actual scheduled sessions OR pending BCBA assignments
      const amSession = newSchedule.find(s => s.studentId === student.id && s.sessionType.includes('AM'));
      const pmSession = newSchedule.find(s => s.studentId === student.id && s.sessionType.includes('PM'));
      
      // *** ALSO CHECK FOR PENDING BCBA ASSIGNMENTS ***
      const pendingAM = pendingBCBAAssignments.find(p => p.studentId === student.id && p.sessionType.includes('AM'));
      const pendingPM = pendingBCBAAssignments.find(p => p.studentId === student.id && p.sessionType.includes('PM'));
      
      // Consider both actual sessions AND pending BCBA assignments for lunch needs calculation
      const hasAMCoverage = amSession || pendingAM;
      const hasPMCoverage = pmSession || pendingPM;
      
      let needs1130 = false;
      let needs1200 = false;
      
      if (!isAbsentFull) {
        if (student.lunchSchedule === 'First') {
          // First lunch students (eat 11:30-12:00)
          // Need supervision 11:30-12:00 if they're present and transitioning
          needs1130 = (hasAMCoverage && !isAbsentAM) || (hasPMCoverage && !isAbsentPM);
          
          // Only need 12:00-12:30 supervision if PM starts at 12:30 (gap coverage)
          needs1200 = hasPMCoverage && !isAbsentPM && 
            ((pmSession && pmSession.sessionType === 'PM (12:30-15:00)') || 
             (pendingPM && pendingPM.sessionType === 'PM (12:30-15:00)'));
          
          console.log(`${student.name} (First Lunch): AM=${amSession?.sessionType || pendingAM?.sessionType}, PM=${pmSession?.sessionType || pendingPM?.sessionType}, needs 11:30=${needs1130}, needs 12:00=${needs1200}`);
        } else {
          // Second lunch students (eat 12:00-12:30)  
          // Need supervision 11:30-12:00 only if AM ends at 11:30 (gap before lunch)
          needs1130 = hasAMCoverage && !isAbsentAM && 
            ((amSession && amSession.sessionType === 'AM Session (8:45-11:30)') || 
             (pendingAM && pendingAM.sessionType === 'AM Session (8:45-11:30)'));
          
          // Need supervision 12:00-12:30 if PM is present (lunch time)
          needs1200 = hasPMCoverage && !isAbsentPM;
          
          console.log(`${student.name} (Second Lunch): AM=${amSession?.sessionType || pendingAM?.sessionType}, PM=${pmSession?.sessionType || pendingPM?.sessionType}, needs 11:30=${needs1130}, needs 12:00=${needs1200}`);
        }
      }
      
      studentLunchNeeds[student.id] = { needs1130, needs1200 };
    });
    
    // Assign lunch coverage based on actual needs
    students.forEach(student => {
      // Skip paired students (handle primary only)
      if (student.pairedWith && student.id > student.pairedWith) return;
      
      const needs = studentLunchNeeds[student.id];
      if (!needs) return;
      
      // Assign 11:30-12:00 coverage if needed
      if (needs.needs1130) {
        let selectedStaff = null;
        // TIER 1: RBT, EA, MHA (direct service staff, not scheduled for AM)
        let availableStaff = staff.filter(member => 
          member.available &&
          ['RBT', 'EA', 'MHA'].includes(member.role) &&
          !staffUsage[member.id].am &&
          staffUsage[member.id].lunchCoverage < 3
        );
        // Shuffle to randomize starting point for fairness
        for (let i = availableStaff.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
        }
        availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
        if (availableStaff.length > 0) {
          selectedStaff = availableStaff[0];
          console.log(`Lunch 1 - TIER 1 (${selectedStaff.role}): ${selectedStaff.name}`);
        }
        // TIER 2: BCBAs not scheduled for AM
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'BCBA' &&
            !staffUsage[member.id].am &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 1 - TIER 2 (BCBA): ${selectedStaff.name}`);
          }
        }
        // TIER 3: Teachers
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'Teacher' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 1 - TIER 3 (Teacher): ${selectedStaff.name}`);
          }
        }
        // TIER 4: CCs
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'CC' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 1 - TIER 4 (CC): ${selectedStaff.name}`);
          }
        }
        // TIER 5: Clinical Trainer
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'Clinical Trainer' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 1 - TIER 5 (Clinical Trainer): ${selectedStaff.name}`);
          }
        }
        // TIER 6: Director (absolute last resort)
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'Director' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 1 - TIER 6 (Director): ${selectedStaff.name}`);
          }
        }
        
        if (selectedStaff) {
          // Create session for primary student
          lunchAssignments.push({
            id: Date.now() + Math.random(),
            studentId: student.id,
            pairedStudentId: student.pairedWith || null,
            staffId: selectedStaff.id,
            sessionType: 'Lunch 1 (11:30-12:00)',
            date: selectedDate,
            time: '11:30-12:00'
          });
          
          // Create session for paired student if applicable
          if (student.pairedWith) {
            lunchAssignments.push({
              id: Date.now() + Math.random() + 0.1,
              studentId: student.pairedWith,
              pairedStudentId: student.id,
              staffId: selectedStaff.id,
              sessionType: 'Lunch 1 (11:30-12:00)',
              date: selectedDate,
              time: '11:30-12:00'
            });
          }
          
          // Update coverage count
          const studentsServed = student.pairedWith ? 2 : 1;
          staffUsage[selectedStaff.id].lunchCoverage += studentsServed;
          console.log(`Assigned lunch 1: ${selectedStaff.role} ${selectedStaff.name} to ${student.name}${student.pairedWith ? ' (paired)' : ''} - now covering ${staffUsage[selectedStaff.id].lunchCoverage} students`);
        } else {
          // *** FORCE DIRECTOR ASSIGNMENT - NO "NEEDED" LUNCH SESSIONS ALLOWED ***
          console.warn(`⚠️ FORCING Director assignment for lunch 1 coverage - ${student.name}`);
          
          // Find ANY available Director/Clinical Trainer regardless of current workload
          const emergencyStaff = staff.filter(member => 
            member.available &&
            ['Director', 'Clinical Trainer'].includes(member.role)
          ).sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          
          if (emergencyStaff.length > 0) {
            const forceAssignedStaff = emergencyStaff[0];
            
            // Create session for primary student
            lunchAssignments.push({
              id: Date.now() + Math.random(),
              studentId: student.id,
              pairedStudentId: student.pairedWith || null,
              staffId: forceAssignedStaff.id,
              sessionType: 'Lunch 1 (11:30-12:00)',
              date: selectedDate,
              time: '11:30-12:00'
            });
            
            // Create session for paired student if applicable
            if (student.pairedWith) {
              lunchAssignments.push({
                id: Date.now() + Math.random() + 0.1,
                studentId: student.pairedWith,
                pairedStudentId: student.id,
                staffId: forceAssignedStaff.id,
                sessionType: 'Lunch 1 (11:30-12:00)',
                date: selectedDate,
                time: '11:30-12:00'
              });
            }
            
            const studentsServed = student.pairedWith ? 2 : 1;
            staffUsage[forceAssignedStaff.id].lunchCoverage += studentsServed;
            console.log(`🚨 EMERGENCY LUNCH 1 ASSIGNMENT: ${forceAssignedStaff.role} ${forceAssignedStaff.name} to ${student.name}${student.pairedWith ? ' (paired)' : ''}`);
          } else {
            console.error(`🚨 CRITICAL: NO DIRECTORS AVAILABLE for emergency lunch 1 coverage - ${student.name}`);
          }
        }
      }
      
      // Assign 12:00-12:30 coverage if needed
      if (needs.needs1200) {
        let selectedStaff = null;
        // TIER 1: RBT, EA, MHA (direct service staff, not scheduled for PM)
        let availableStaff = staff.filter(member => 
          member.available &&
          ['RBT', 'EA', 'MHA'].includes(member.role) &&
          !staffUsage[member.id].pm &&
          staffUsage[member.id].lunchCoverage < 3
        );
        for (let i = availableStaff.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
        }
        availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
        if (availableStaff.length > 0) {
          selectedStaff = availableStaff[0];
          console.log(`Lunch 2 - TIER 1 (${selectedStaff.role}): ${selectedStaff.name}`);
        }
        // TIER 2: BCBAs not scheduled for PM
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'BCBA' &&
            !staffUsage[member.id].pm &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 2 - TIER 2 (BCBA): ${selectedStaff.name}`);
          }
        }
        // TIER 3: Teachers
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'Teacher' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 2 - TIER 3 (Teacher): ${selectedStaff.name}`);
          }
        }
        // TIER 4: CCs
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'CC' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 2 - TIER 4 (CC): ${selectedStaff.name}`);
          }
        }
        // TIER 5: Clinical Trainer
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'Clinical Trainer' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 2 - TIER 5 (Clinical Trainer): ${selectedStaff.name}`);
          }
        }
        // TIER 6: Director (absolute last resort)
        if (!selectedStaff) {
          availableStaff = staff.filter(member => 
            member.available &&
            member.role === 'Director' &&
            staffUsage[member.id].lunchCoverage < 3
          );
          for (let i = availableStaff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableStaff[i], availableStaff[j]] = [availableStaff[j], availableStaff[i]];
          }
          availableStaff.sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          if (availableStaff.length > 0) {
            selectedStaff = availableStaff[0];
            console.log(`Lunch 2 - TIER 6 (Director): ${selectedStaff.name}`);
          }
        }
        
        if (selectedStaff) {
          // Create session for primary student
          lunchAssignments.push({
            id: Date.now() + Math.random(),
            studentId: student.id,
            pairedStudentId: student.pairedWith || null,
            staffId: selectedStaff.id,
            sessionType: 'Lunch 2 (12:00-12:30)',
            date: selectedDate,
            time: '12:00-12:30'
          });
          
          // Create session for paired student if applicable
          if (student.pairedWith) {
            lunchAssignments.push({
              id: Date.now() + Math.random() + 0.1,
              studentId: student.pairedWith,
              pairedStudentId: student.id,
              staffId: selectedStaff.id,
              sessionType: 'Lunch 2 (12:00-12:30)',
              date: selectedDate,
              time: '12:00-12:30'
            });
          }
          
          // Update coverage count
          const studentsServed = student.pairedWith ? 2 : 1;
          staffUsage[selectedStaff.id].lunchCoverage += studentsServed;
          console.log(`Assigned lunch 2: ${selectedStaff.role} ${selectedStaff.name} to ${student.name}${student.pairedWith ? ' (paired)' : ''} - now covering ${staffUsage[selectedStaff.id].lunchCoverage} students`);
        } else {
          // *** FORCE DIRECTOR ASSIGNMENT - NO "NEEDED" LUNCH SESSIONS ALLOWED ***
          console.warn(`⚠️ FORCING Director assignment for lunch 2 coverage - ${student.name}`);
          
          // Find ANY available Director/Clinical Trainer regardless of current workload
          const emergencyStaff = staff.filter(member => 
            member.available &&
            ['Director', 'Clinical Trainer'].includes(member.role)
          ).sort((a, b) => staffUsage[a.id].lunchCoverage - staffUsage[b.id].lunchCoverage);
          
          if (emergencyStaff.length > 0) {
            const forceAssignedStaff = emergencyStaff[0];
            
            // Create session for primary student
            lunchAssignments.push({
              id: Date.now() + Math.random(),
              studentId: student.id,
              pairedStudentId: student.pairedWith || null,
              staffId: forceAssignedStaff.id,
              sessionType: 'Lunch 2 (12:00-12:30)',
              date: selectedDate,
              time: '12:00-12:30'
            });
            
            // Create session for paired student if applicable
            if (student.pairedWith) {
              lunchAssignments.push({
                id: Date.now() + Math.random() + 0.1,
                studentId: student.pairedWith,
                pairedStudentId: student.id,
                staffId: forceAssignedStaff.id,
                sessionType: 'Lunch 2 (12:00-12:30)',
                date: selectedDate,
                time: '12:00-12:30'
              });
            }
            
            const studentsServed = student.pairedWith ? 2 : 1;
            staffUsage[forceAssignedStaff.id].lunchCoverage += studentsServed;
            console.log(`🚨 EMERGENCY LUNCH 2 ASSIGNMENT: ${forceAssignedStaff.role} ${forceAssignedStaff.name} to ${student.name}${student.pairedWith ? ' (paired)' : ''}`);
          } else {
            console.error(`🚨 CRITICAL: NO DIRECTORS AVAILABLE for emergency lunch 2 coverage - ${student.name}`);
          }
        }
      }
    });

    console.log(`Created ${lunchAssignments.length} lunch assignments`);
    
    // Store lunch needs for display logic
    const globalStudentLunchNeeds = studentLunchNeeds;
    
    // Combine all assignments
    const allAssignments = [...newSchedule, ...lunchAssignments];
    
    // *** FINAL CLEANUP: Convert ANY remaining "NEEDED" sessions to BCBA manual selection ***
    // This ensures NO gaps remain in the published schedule
    console.log('Final cleanup: Converting any remaining "NEEDED" sessions to BCBA manual selection...');
    
    let cleanupCount = 0;
    
    students.forEach(student => {
      if (student.pairedWith && student.id > student.pairedWith) return; // Skip paired duplicates
      
      const currentAttendance = getStudentAttendance(student.id, selectedDate);
      if (currentAttendance === 'absent_full') return; // Skip fully absent students
      
      // Get lunch needs for this student
      const lunchNeeds = globalStudentLunchNeeds[student.id] || { needs1130: false, needs1200: false };
      
      const sessionTypes = [
        { 
          type: student.lunchSchedule === 'First' ? 'AM Session (8:45-11:30)' : 'AM Session (8:45-12:00)', 
          display: 'AM Session',
          shouldHave: !isStudentAbsent(student.id, 'AM Session', selectedDate)
        },
        { 
          type: 'Lunch 1 (11:30-12:00)', 
          display: 'Lunch 1',
          shouldHave: lunchNeeds.needs1130
        },
        { 
          type: 'Lunch 2 (12:00-12:30)', 
          display: 'Lunch 2',
          shouldHave: lunchNeeds.needs1200
        },
        { 
          type: student.lunchSchedule === 'First' ? 'PM (12:00-15:00)' : 'PM (12:30-15:00)', 
          display: 'PM Session',
          shouldHave: !isStudentAbsent(student.id, 'PM Session', selectedDate)
        }
      ];
      
      sessionTypes.forEach(sessionInfo => {
        if (!sessionInfo.shouldHave) return; // Skip if student shouldn't have this session
        
        // Check if this session is already assigned
        const existingSession = allAssignments.find(s => 
          s.studentId === student.id && s.sessionType === sessionInfo.type
        );
        
        // Check if there's already a pending BCBA assignment for this session
        const existingPending = pendingBCBAAssignments.find(p => 
          p.studentId === student.id && p.sessionType === sessionInfo.type
        );
        
        // If no existing assignment and no pending BCBA assignment, create one
        if (!existingSession && !existingPending) {
          const pendingId = createPendingBCBAAssignment(
            student.id,
            sessionInfo.type,
            selectedDate,
            sessionTypes[sessionInfo.type]
          );
          
          cleanupCount++;
          console.log(`Final cleanup: Added BCBA manual selection for ${student.name} - ${sessionInfo.display}`);
          
          // Handle paired students - create separate pending assignment
          if (student.pairedWith) {
            const pairedPendingId = createPendingBCBAAssignment(
              student.pairedWith,
              sessionInfo.type,
              selectedDate,
              sessionTypes[sessionInfo.type]
            );
            cleanupCount++;
            console.log(`Final cleanup: Added BCBA manual selection for paired student - ${sessionInfo.display}`);
          }
        }
      });
    });
    
    console.log(`Final cleanup complete: ${cleanupCount} additional BCBA manual selections created`);

    setSchedule(allAssignments);
    
    // Generate and set schedule analysis
    const analysis = analyzeSchedule(newSchedule);
    setScheduleAnalysis(analysis);
    setShowAnalysis(true);
    
    // Update assignment history
    const newHistory = newSchedule.map(session => ({
      date: selectedDate,
      studentId: session.studentId,
      staffId: session.staffId,
      sessionType: session.sessionType
    }));
    
    setAssignmentHistory(prev => [...prev, ...newHistory]);
    
    // Update rotation tracking
    newSchedule.forEach(session => {
      if (session.sessionType.includes('AM Session') || session.sessionType.includes('PM')) {
        addRecentAssignment(session.studentId, session.staffId, selectedDate);
      }
    });
    
    // *** FINAL BCBA MANUAL SELECTION STEP ***
    // Convert any remaining unassigned sessions to pending BCBA assignments
    const finalUnassigned = assignmentQueue.filter(assignment => !assignment.assigned);
    
    if (finalUnassigned.length > 0) {
      console.log(`Converting ${finalUnassigned.length} remaining unassigned sessions to BCBA manual selection...`);
      
      finalUnassigned.forEach(assignment => {
        const student = students.find(s => s.id === assignment.studentId);
        
        const pendingId = createPendingBCBAAssignment(
          assignment.studentId, 
          assignment.sessionType, 
          selectedDate, 
          sessionTypes[assignment.sessionType]
        );
        
        assignment.assigned = true;
        assignment.pendingBCBAId = pendingId;
        
        // Handle paired students - they share the same BCBA assignment
        if (assignment.isPaired && assignment.pairedStudentId) {
          const pairedAssignment = assignmentQueue.find(a => 
            a.studentId === assignment.pairedStudentId && 
            a.sessionType === assignment.sessionType &&
            !a.assigned
          );
          if (pairedAssignment) {
            pairedAssignment.assigned = true;
            pairedAssignment.pendingBCBAId = pendingId;
          }
        }
        
        console.log(`Final BCBA Manual Selection: ${student?.name} - ${assignment.sessionType} (Pending ID: ${pendingId})`);
      });
    }
    
    console.log(`✅ SCHEDULE GENERATED: ${newSchedule.length} total sessions, ${pendingBCBAAssignments.length} pending BCBA selections`);
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
    
    // Check for pending BCBA assignments for this student
    const pendingBCBAs = pendingBCBAAssignments.filter(p => p.studentId === student.id);

    const amSession = studentSessions.find(s => 
      s.sessionType === 'AM Session (8:45-11:30)' || s.sessionType === 'AM Session (8:45-12:00)'
    );
    const lunch1 = studentSessions.find(s => s.sessionType === 'Lunch 1 (11:30-12:00)');
    const lunch2 = studentSessions.find(s => s.sessionType === 'Lunch 2 (12:00-12:30)');
    const pmSession = studentSessions.find(s => 
      s.sessionType === 'PM (12:00-15:00)' || s.sessionType === 'PM (12:30-15:00)'
    );
    
    // Check for pending BCBA assignments
    const pendingAM = pendingBCBAs.find(p => p.sessionType.includes('AM'));
    const pendingPM = pendingBCBAs.find(p => p.sessionType.includes('PM'));

    // *** ATTENDANCE DISPLAY FIX: Calculate attendance status for each session type ***
    const isAbsentFull = getStudentAttendance(student.id, selectedDate) === 'absent_full';
    const isAbsentAM = isStudentAbsent(student.id, 'AM Session', selectedDate);
    const isAbsentPM = isStudentAbsent(student.id, 'PM Session', selectedDate);

    const renderSessionCell = (session, pendingBCBA = null, isLunchPeriod = false, lunchNeeded = true, sessionTypeForAttendance = null) => {
      // *** ATTENDANCE CHECK FIRST: Check attendance before anything else ***
      if (sessionTypeForAttendance) {
        if (isAbsentFull || 
            (sessionTypeForAttendance === 'AM' && isAbsentAM) ||
            (sessionTypeForAttendance === 'PM' && isAbsentPM)) {
          return {
            display: 'ABSENT',
            class: 'bg-gray-200 text-gray-600'
          };
        }
      }

      // Check for pending BCBA assignment second
      // Only show dropdown if there is no assigned session for this slot
      if (!session && pendingBCBA) {
        return {
          display: (
            <div className="text-xs">
              <div className="text-purple-700 font-medium mb-1">Clinician needed for coverage</div>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    assignSelectedBCBA(pendingBCBA.id, e.target.value);
                  }
                }}
                className="text-xs p-1 rounded border bg-white w-full"
                defaultValue=""
              >
                <option value="">Select BCBA...</option>
                {pendingBCBA.availableBCBAs.map(bcba => (
                  <option key={bcba.id} value={bcba.id}>
                    BCBA {bcba.name}
                  </option>
                ))}
              </select>
            </div>
          ),
          class: 'bg-purple-100 text-purple-700 border border-purple-300'
        };
      }
      
      // For lunch periods, check if coverage is actually needed
      if (isLunchPeriod && !lunchNeeded) {
        return {
          display: 'X',
          class: 'bg-gray-100 text-gray-500'
        };
      }
      
      if (!session) {
        // For lunch, only show a staff name if a lunch session is actually assigned
        // If no session, show 'NEEDED' (or blank), not a default staff
        if (isLunchPeriod) {
          return {
            display: 'NEEDED',
            class: 'bg-red-100 text-red-700'
          };
        }
        return {
          display: 'NEEDED',
          class: 'bg-red-100 text-red-700'
        };
      }

      const staffMember = staff.find(s => s.id === session.staffId);
      
      // Handle 2:1 students - show all staff assigned to this student/session
      if (session.is2to1) {
        const allSessionsForStudent = todaySessions.filter(s => 
          s.studentId === session.studentId && 
          s.sessionType === session.sessionType
        );
        const staffNames = allSessionsForStudent.map(s => {
          const staffMember = staff.find(sm => sm.id === s.staffId);
          return staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown';
        });
        return {
          display: staffNames.join(' + '),
          class: 'bg-blue-100 text-blue-700'
        };
      }
      
      const staffDisplay = staffMember ? `${staffMember.role} ${staffMember.name}` : 'Unknown';
      
      return {
        display: staffDisplay,
        class: session.sessionType.includes('Lunch') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
      };
    };

    // Determine if lunch coverage is actually needed for this student (matching assignment logic)
    // Find actual sessions to determine timing
    const actualAM = todaySessions.find(s => s.studentId === student.id && s.sessionType.includes('AM'));
    const actualPM = todaySessions.find(s => s.studentId === student.id && s.sessionType.includes('PM'));
    
    let needsLunch1130 = false;
    let needsLunch1200 = false;
    
    if (!isAbsentFull) {
      if (student.lunchSchedule === 'First') {
        // First lunch students (eat 11:30-12:00)
        // Need supervision 11:30-12:00 if they're present and have sessions
        needsLunch1130 = (actualAM && !isAbsentAM) || (actualPM && !isAbsentPM);
        
        // Only need 12:00-12:30 supervision if PM starts at 12:30 (gap coverage)
        needsLunch1200 = actualPM && actualPM.sessionType === 'PM (12:30-15:00)' && !isAbsentPM;
      } else {
        // Second lunch students (eat 12:00-12:30)
        // Need supervision 11:30-12:00 only if AM ends at 11:30 (gap before lunch)
        needsLunch1130 = actualAM && actualAM.sessionType === 'AM Session (8:45-11:30)' && !isAbsentAM;
        
        // Need supervision 12:00-12:30 if PM is present (lunch time)
        needsLunch1200 = actualPM && !isAbsentPM;
      }
    }

    // *** FIXED: Pass session type for attendance checking ***
    const amCell = renderSessionCell(amSession, pendingAM, false, true, 'AM');
    const lunch1Cell = renderSessionCell(lunch1, null, true, needsLunch1130, null); // Lunch doesn't need session type check, handled above
    const lunch2Cell = renderSessionCell(lunch2, null, true, needsLunch1200, null);
    const pmCell = renderSessionCell(pmSession, pendingPM, false, true, 'PM');

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
                onClick={() => setShowAnalysis(!showAnalysis)}
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
            </div>
          </div>

          {/* BCBA Manual Selection Status */}
          {pendingBCBAAssignments.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-purple-800 mb-2">⚠️ BCBA Manual Selection Required</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <div>• {pendingBCBAAssignments.length} sessions need BCBA coverage</div>
                <div>• Purple dropdowns will appear in the schedule table</div>
                <div>• Select appropriate BCBA from dropdown to complete assignments</div>
                <div>• This prevents automatic BCBA assignments and gives you manual control</div>
              </div>
            </div>
          )}



          {scheduleAnalysis && showAnalysis && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-cyan-800 mb-4">📊 Schedule Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white rounded-lg p-4 border border-cyan-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    AM Sessions (8:45-11:30/12:00) 
                    <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {scheduleAnalysis.utilization?.AM || 0}% Utilized
                    </span>
                  </h4>
                  
                  {scheduleAnalysis.unassignedAM && scheduleAnalysis.unassignedAM.length > 0 ? (
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
                  ) : (
                    <div className="text-green-700 font-medium text-sm">✓ All available staff assigned!</div>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4 border border-cyan-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    PM Sessions (12:00/12:30-15:00)
                    <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {scheduleAnalysis.utilization?.PM || 0}% Utilized
                    </span>
                  </h4>
                  
                  {scheduleAnalysis.unassignedPM && scheduleAnalysis.unassignedPM.length > 0 ? (
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
                  ) : (
                    <div className="text-green-700 font-medium text-sm">✓ All available staff assigned!</div>
                  )}
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
                          {renderTeamStaff(student)}
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
              <span className="text-gray-600">Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
              <span className="text-gray-600">BCBA Manual Selection Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-gray-600">Assignment Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Student Absent</span>
            </div>
          </div>

          {showAttendanceManager && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowAttendanceManager(false)}
            >
              <div 
                className="bg-white rounded-lg shadow-xl border w-full max-w-6xl"
                style={{ height: '85vh', maxHeight: '700px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
                  <h3 className="text-xl font-semibold">Student Attendance - {selectedDate}</h3>
                  <button 
                    onClick={() => setShowAttendanceManager(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                
                <div 
                  className="px-6 py-4"
                  style={{ 
                    height: 'calc(85vh - 140px)', 
                    maxHeight: 'calc(700px - 140px)', 
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                  }}
                >
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Attendance Options</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div><strong>Present:</strong> Student will attend both AM and PM sessions</div>
                      <div><strong>AM Out:</strong> Student absent for AM session only</div>
                      <div><strong>PM Out:</strong> Student absent for PM session only</div>
                      <div><strong>Full Day Absent:</strong> Student will not attend any sessions</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.map(student => {
                      const currentAttendance = getStudentAttendance(student.id, selectedDate);
                      
                      return (
                        <div key={student.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="mb-3">
                            <h4 className="font-semibold text-lg text-gray-800">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.ratio} • {student.lunchSchedule} Lunch</p>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                value="present"
                                checked={currentAttendance === 'present'}
                                onChange={() => setStudentAttendanceState(student.id, selectedDate, 'present')}
                                className="mr-2"
                              />
                              <span className="text-green-700 font-medium">Present</span>
                            </label>
                            
                            <label className="block">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                value="absent_am"
                                checked={currentAttendance === 'absent_am'}
                                onChange={() => setStudentAttendanceState(student.id, selectedDate, 'absent_am')}
                                className="mr-2"
                              />
                              <span className="text-orange-700 font-medium">AM Out</span>
                            </label>
                            
                            <label className="block">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                value="absent_pm"
                                checked={currentAttendance === 'absent_pm'}
                                onChange={() => setStudentAttendanceState(student.id, selectedDate, 'absent_pm')}
                                className="mr-2"
                              />
                              <span className="text-orange-700 font-medium">PM Out</span>
                            </label>
                            
                            <label className="block">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                value="absent_full"
                                checked={currentAttendance === 'absent_full'}
                                onChange={() => setStudentAttendanceState(student.id, selectedDate, 'absent_full')}
                                className="mr-2"
                              />
                              <span className="text-red-700 font-medium">Full Day Absent</span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
                  <p className="text-sm text-gray-600">Changes automatically saved • Rerun Auto-Assign after attendance changes</p>
                  <button 
                    onClick={() => setShowAttendanceManager(false)}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

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
                <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
                  <h3 className="text-xl font-semibold">Manage Staff Availability</h3>
                  <button 
                    onClick={() => setShowStaffManager(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                
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
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
                  <p className="text-sm text-gray-600">Click staff to toggle availability</p>
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
                <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
                  <h3 className="text-xl font-semibold">Manage Student Teams</h3>
                  <button 
                    onClick={() => setShowTeamManager(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                
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
                      .sort((a, b) => a.name.localeCompare(b.name))
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
                              .sort((a, b) => a.name.localeCompare(b.name))
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
                
                <div className="flex justify-between items-center p-4 border-t bg-gray-50 rounded-b-lg">
                  <p className="text-sm text-gray-600">Changes automatically saved</p>
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