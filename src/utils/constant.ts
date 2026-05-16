export const URL_PATHS = {
  login: 'auth/login',
  dashboard: '/dashboard/index',
  pim: {
    employeeList: '/pim/viewEmployeeList',
    addEmployee: '/pim/addEmployee',
    report: '/pim/viewDefinedPredefinedReports',
  },
};

export const PAGE_TITLES = {
  orangeHrm: 'OrangeHRM',
};

export type URLPathKey = keyof typeof URL_PATHS;
