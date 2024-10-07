const InstitutionList = {
  AITR: 'Acropolis Institute of Technology and Research',
  AIMSR: 'Acropolis Institute of Management Studies & Research',
  AIPER: 'Acropolis Institute Of Pharmaceutical Education & Research',
  AMR: 'Acropolis Faculty of Management and Research',
  AILAW: 'Acropolis Institute of LAW',
  CDC: 'Career Development Cell',
  AC: 'Acro Care',
  AIIH: 'AIIH Foundation',
  // Add more institution mappings as needed
};

const DepartmentList = {
  CE: 'Civil Engineering',
  ME: 'Mechanical Engineering',
  EC: 'Electronics & Communication',
  CSE: 'Computer Science & Engineering',
  AIML: 'Artificial Intelligence and Machine Learning',
  IT: 'Information Technology',
  CSIT: 'Computer Science and Information Technology',
  FCA: 'Faculty of Computer Applications',
  HUMI: 'Humanities',
  CHEM: 'Chemistry',
  AC: 'Acro Care',
  CDC: 'Career Development Cell',
  BSC: 'Bio Science',
  BBA: 'Bachelor of Business Administration',
  AILAW: 'Acropolis Institute of LAW',
  AMR: 'Acropolis Faculty of Management and Research',
  AIMSR: 'Acropolis Institute of Management Studies & Research',
  AIPER: 'Acropolis Institute Of Pharmaceutical Education & Research',
  EDC: 'EDC',
  PLACEMENT: 'Placement',
  TRAINING: 'Training',
  IIPC: 'IIPC',
  AIIH: 'AIIH Foundation',
  ADMI:'Adminiatrative',
  STORE:'Store'

  // Add more department mappings as needed
};

const institutions = [
  {
    name: InstitutionList['AITR'],
    departments: [
      DepartmentList['CE'],
      DepartmentList['ME'],
      DepartmentList['EC'],
      DepartmentList['CSE'],
      DepartmentList['AIML'],
      DepartmentList['IT'],
      DepartmentList['CSIT'],
      DepartmentList['FCA'],
      DepartmentList['HUMI'],
      DepartmentList['CHEM'],
      DepartmentList['ADMI'],
      DepartmentList['STORE']
    ],
  },
  {
    name: InstitutionList['AIMSR'],
    departments: [
      DepartmentList['BSC'],
      DepartmentList['BBA'],
    ],
  },
  {
    name: InstitutionList['AIPER'],
    departments: [
      DepartmentList['AIPER'],
    ],
  },
  {
    name: InstitutionList['AMR'],
    departments: [
      DepartmentList['AMR'],
    ],
  },
  {
    name: InstitutionList['AILAW'],
    departments: [
      DepartmentList['AILAW'],
    ],
  },
  {
    name: InstitutionList['CDC'],
    departments: [
      DepartmentList['CDC'],
      DepartmentList['EDC'],
      DepartmentList['PLACEMENT'],
      DepartmentList['TRAINING'],
      DepartmentList['IIPC'],
    ],
  },
  {
    name: InstitutionList['AC'],
    departments: [
      DepartmentList['AC'],
    ],
  }, {
    name: InstitutionList['AIIH'],
    departments: [
      DepartmentList['AIIH'],
    ],
  },
  // Add more institutions based on InstitutionList mappings as needed
];

export { institutions, InstitutionList, DepartmentList };
