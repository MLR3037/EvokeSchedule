import { graphService } from '../services/GraphService';

export class DataMigration {
  // Your existing hardcoded staff data
  static INITIAL_STAFF = [
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
  { id: 28, name: 'Helen', role: 'BS', available: true },
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
  ];

  // Your existing student data
  static INITIAL_STUDENTS = [
  { id: 1, name: 'Ada', ratio: '1:1', lunchSchedule: 'First', requiresLunch1to1: true, teamStaff: ['Allie','Araceli','Charlie','Helen','Katie','Klaus','Liz M','Taylor','Adriana','Lyndsey'] },
  { id: 3, name: 'Alejandro', ratio: '1:1', lunchSchedule: 'First', requiresLunch1to1: true, teamStaff: ['Amber', 'Ari', 'Fernando', 'Jayme', 'Keyshawn', 'Klaus', 'Laurel', 'Lex', 'Taylor'] },
  { id: 4, name: 'Asen', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Amber', 'Jay S', 'Katie', 'Keyshawn', 'Lex', 'Liz M', 'Megan M', 'Mel', 'Taylor'] },
  { id: 5, name: 'Austin', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [16], teamStaff: ['Ari', 'Fernando', 'Haason', 'Harry', 'Jayme', 'Lex', 'Megan M', 'ShaeLoren', 'Yun', 'Adriana'] },
  { id: 6, name: 'Caleb', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [14, 17], teamStaff: ['Amber', 'Ari', 'Derez', 'Elise', 'Jay S', 'Kat', 'Liz M', 'Megan M', 'Mel', 'ShaeLoren', 'Taylor'] },
  { id: 7, name: 'Charles', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Fernando', 'Katie', 'Keyshawn', 'Klaus', 'Mel', 'Natalie J', 'Nicole', 'Will S'] },
  { id: 8, name: 'Elijah', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Araceli', 'Haason', 'Harry', 'Katie', 'Lex', 'Liz M', 'Robert', 'Will S'] },
  { id: 9, name: 'Gabe', ratio: '1:2', pairedWith: 20, lunchSchedule: 'First', lunchPairing: [10, 20], teamStaff: ['Allie', 'Amber', 'Araceli', 'Carmelo', 'Haason', 'Kat', 'Laurel', 'Megan M', 'Natalie J', 'Tia'] },
  { id: 10, name: 'Isaac', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [9, 20], teamStaff: ['Allie', 'Amber', 'Araceli', 'Fernando', 'Harry', 'Jayme', 'Kat', 'Lex', 'Tia', 'Adriana'] },
  { id: 11, name: 'Joseph', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Brenda', 'Emma', 'Fin', 'Malik', 'Savannah G', 'Syder', 'Zion', 'Paxtynn'] },
  { id: 12, name: 'Josephine', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [15], teamStaff: ['Charlie', 'Jayme', 'Keyshawn', 'Lex', 'Liz M', 'Mel', 'Natalie J', 'Nicole', 'ShaeLoren'] },
  { id: 13, name: 'Justin', ratio: '1:1', lunchSchedule: 'First', requiresLunch1to1: true, teamStaff: ['Allie', 'Fernando', 'Haason', 'Harry', 'Laurel', 'Robert', 'Tia', 'Yun'] },
  { id: 14, name: 'Levi', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [6, 17], teamStaff: ['Araceli', 'Elise', 'Haason', 'Jayme', 'Liz M', 'Mel', 'Nicole', 'Quay', 'Lyndsey'] },
  { id: 15, name: 'Logan', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [12], teamStaff: ['Derez', 'Haason', 'Jayme', 'Jordyn', 'Keyshawn', 'Lex', 'Mel', 'Natalie J', 'Robert', 'ShaeLoren'] },
  { id: 16, name: 'Lydia', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [5], teamStaff: ['Araceli', 'Derez', 'Haason', 'Jordyn', 'Keyshawn', 'Laurel', 'Mel', 'Natalie J', 'Robert', 'Tia'] },
  { id: 17, name: 'Mateo', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [6, 14], teamStaff: ['Allie', 'Amber', 'Harry', 'Kat', 'Liz M', 'Natalie J', 'Quay', 'Tia', 'Yun'] },
  { id: 18, name: 'Michael', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Fernando', 'Helen', 'Katie', 'Klaus', 'Megan M', 'Mel', 'ShaeLoren', 'Will S'] },
  { id: 19, name: 'Peter', ratio: '1:1', lunchSchedule: 'First', requiresLunch1to1: true, teamStaff: ['Carmelo', 'Derez', 'Jordyn', 'Keyshawn', 'Klaus', 'Laurel', 'Liz M', 'Quay', 'ShaeLoren'] },
  { id: 20, name: 'Roman', ratio: '1:2', pairedWith: 9, lunchSchedule: 'First', lunchPairing: [9, 10], teamStaff: ['Allie', 'Amber', 'Araceli', 'Carmelo', 'Haason', 'Laurel', 'Megan M', 'Natalie J', 'Tia'] },
  { id: 21, name: 'Wenzday', ratio: '2:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Amber', 'Araceli', 'Charlie', 'Elise', 'Fernando', 'Harry', 'Jayme', 'Kat', 'Klaus', 'Laurel', 'Lex', 'ShaeLoren'] },
  { id: 22, name: 'Remi', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Amber', 'Ari', 'Fernando', 'Harry', 'Katie', 'Keyshawn', 'ShaeLoren'] },
  { id: 23, name: 'Kymani', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Carmelo', 'Helen', 'Jay S', 'Klaus', 'Quay', 'Taylor', 'Adriana'] },
  { id: 24, name: 'Arian', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [25], teamStaff: ['Ari', 'Charlie', 'Derez', 'Helen', 'Jordyn', 'Taylor'] },
  { id: 25, name: 'Vinny', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [24], teamStaff: ['Ari', 'Charlie', 'Jayme', 'Katie', 'Nicole'] },
  { id: 26, name: 'Bao', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Derez', 'Jay S', 'Jordyn', 'Robert', 'Taylor', 'Yun'] },
  { id: 27, name: 'Adrian', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [28], teamStaff: ['Charlie', 'Jay S', 'Jordyn', 'Megan M', 'Quay', 'Will S'] },
  { id: 28, name: 'Cesar', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [27], teamStaff: ['Charlie', 'Fernando', 'Jay S', 'Klaus', 'Quay', 'Robert', 'Taylor', 'Tia'] },
  { id: 29, name: 'Jay', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Ari', 'Carmelo', 'Derez', 'Helen'] },
  { id: 30, name: 'Elias', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [31], teamStaff: ['Haason', 'Helen', 'Jordyn', 'Mel', 'Quay', 'Robert', 'Will S'] },
  { id: 31, name: 'Milo', ratio: '1:1', lunchSchedule: 'First', lunchPairing: [30], teamStaff: ['Ari', 'Charlie', 'Helen', 'Jordyn', 'Laurel', 'Robert', 'Lyndsey'] },
  { id: 32, name: 'Aiden', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Emma', 'Faith', 'Fin', 'Haiden', 'Jess', 'Sebastian', 'Tess', 'Rayann'] },
  { id: 33, name: 'Anthony', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Emma', 'Faith', 'Fin', 'Haiden', 'Hannah', 'Sebastian', 'Zion', 'Paxtynn'] },
  { id: 34, name: 'Calvin', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Christina', 'Emma', 'Faith', 'Haiden', 'Hannah', 'Malik', 'Sebastian', 'Syder'] },
  { id: 35, name: 'Carter', ratio: '1:1', lunchSchedule: 'Second', lunchPairing: [38], teamStaff: ['Alannah', 'Emma', 'Fin', 'Haiden', 'Hannah', 'Jess', 'Nico', 'Tess'] },
  { id: 36, name: "Dai'Veon", ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Emma', 'Fin', 'Hannah', 'Josh', 'Sebastian', 'Syder', 'Paxtynn', 'Rayann'] },
  { id: 37, name: 'Drake', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Alannah', 'Christina', 'Faith', 'Fin', 'Josh', 'Kaydie', 'Malik', 'Syder', 'Tess'] },
  { id: 38, name: 'Henry', ratio: '1:2', pairedWith: 42, lunchSchedule: 'Second', lunchPairing: [35], teamStaff: ['Alannah', 'Faith', 'Fin', 'Haiden', 'Hannah', 'Jess', 'Josh', 'Kaydie', 'Sebastian', 'Zion'] },
  { id: 39, name: 'Kyden', ratio: '1:1', lunchSchedule: 'Second', lunchPairing: [42], teamStaff: ['Alannah', 'Christina', 'Faith', 'Haiden', 'Hannah', 'Kaydie'] },
  { id: 40, name: 'Noah', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Emma', 'Haiden', 'Kaydie', 'Malik', 'Nico', 'Tess'] },
  { id: 41, name: 'Ghani', ratio: '1:1', lunchSchedule: 'Second', requiresLunch1to1: true, teamStaff: ['Brenda', 'Christina', 'Emma', 'Faith', 'Haiden', 'Jess', 'Sebastian', 'Syder', 'Tess', 'Anna'] },
  { id: 42, name: 'Sebastian', ratio: '1:2', pairedWith: 38, lunchSchedule: 'Second', lunchPairing: [39], teamStaff: ['Alannah', 'Faith', 'Fin', 'Haiden', 'Hannah', 'Jess', 'Josh', 'Kaydie', 'Sebastian', 'Tess', 'Zion'] },
  { id: 43, name: 'Shawn', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Alannah', 'Brenda', 'Christina', 'Hannah', 'Jess', 'Nik', 'Savannah G', 'Syder', 'Tess'] },
  { id: 44, name: 'William', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Brenda', 'Kaydie', 'Nik', 'Shae', 'Syder', 'Tess', 'Zion', 'Paxtynn'] },
  { id: 45, name: 'Darrian', ratio: '1:1', lunchSchedule: 'Second', lunchPairing: [46], teamStaff: ['Jess', 'Malik', 'Nico', 'Nik', 'Savannah G', 'Shae', 'Anna'] },
  { id: 46, name: 'Sean', ratio: '1:1', lunchSchedule: 'Second', lunchPairing: [45], teamStaff: ['Alannah', 'Brenda', 'Christina', 'Josh', 'Nico', 'Savannah G', 'Shae', 'Zion'] },
  { id: 47, name: 'Joseph D.', ratio: '1:1', lunchSchedule: 'First', teamStaff: ['Allie', 'Araceli', 'Harry', 'Laurel', 'Liz M', 'Megan M', 'Natalie J', 'Nicole', 'Tia', 'Rayann'] },
  { id: 48, name: "C'Laya", ratio: '1:1', lunchSchedule: 'Second', requiresLunch1to1: true, teamStaff: ['Adam', 'Brenda', 'Christina', 'Hannah', 'Malik', 'Nico', 'Nik', 'Savannah G', 'Shae'] },
  { id: 49, name: 'Jesse', ratio: '1:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Brenda', 'Josh', 'Malik', 'Nico', 'Nik', 'Shae', 'Zion', 'Anna'] },
  { id: 50, name: 'Austin M.', ratio: '1:1', lunchSchedule: 'Second', requiresLunch1to1: true, teamStaff: ['Adam', 'Brenda', 'Faith', 'Josh', 'Kaydie', 'Nik', 'Savannah G', 'Shae', 'Syder'] },
  { id: 51, name: 'Bryce', ratio: '1:1', lunchSchedule: 'Second', requiresLunch1to1: true, teamStaff: ['Adam', 'Christina', 'Jess', 'Malik', 'Nico', 'Nik', 'Savannah G', 'Shae'] },
  { id: 52, name: 'Tejas', ratio: '2:1', amRatio: '1:1', pmRatio: '2:1', lunchSchedule: 'Second', teamStaff: ['Adam', 'Christina', 'Jess', 'Josh', 'Kaydie', 'Nico', 'Nik', 'Savannah G', 'Sebastian', 'Shae', 'Zion'] }
    // Add all your remaining students here...
  ];

  static async migrateAllData() {
    console.log('Starting data migration...');
    
    try {
      await this.migrateStaff();
      await this.migrateStudents();
      console.log('Data migration completed successfully!');
    } catch (error) {
      console.error('Data migration failed:', error);
    }
  }

  static async migrateStaff() {
    console.log('Migrating staff...');
    
    for (const staff of this.INITIAL_STAFF) {
      try {
        await graphService.createStaff({
          name: staff.name,
          role: staff.role,
          available: staff.available
        });
        console.log(`Migrated staff: ${staff.name}`);
      } catch (error) {
        console.error(`Failed to migrate staff ${staff.name}:`, error);
      }
    }
  }

  static async migrateStudents() {
    console.log('Migrating students...');
    
    for (const student of this.INITIAL_STUDENTS) {
      try {
        await graphService.createClient({
          name: student.name,
          ratio: student.ratio,
          amRatio: student.amRatio,
          pmRatio: student.pmRatio,
          lunchSchedule: student.lunchSchedule,
          requiresLunch1to1: student.requiresLunch1to1 || false,
          lunchPairing: student.lunchPairing || [],
          pairedWith: student.pairedWith,
          teamStaff: student.teamStaff || []
        });
        console.log(`Migrated student: ${student.name}`);
      } catch (error) {
        console.error(`Failed to migrate student ${student.name}:`, error);
      }
    }
  }
}