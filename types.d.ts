interface LoginProps {
  email: string;
  password: string;
}

interface DepartmentProps {
  id: string;
  departmentName: string;
  divisionId: string;
}

interface DivisionProps {
  id: string;
  divisionName: string;
}

interface DesignationProps {
  id: string;
  name: string;
}

interface EmployeeDataProps {
  id: string;
  staffNo: string;
  supervisorId: string | null;
  dateOfBirth: string;
  dateOfAppointment: string;
  dateOfLastPromotion: string | null;
  designation: DesignationProps;
}

interface PermissionDataProps {
  id: string;
  name: string;
}

interface PermissionProps {
  permission: PermissionDataProps;
}

interface RoleProps {
  id: string;
  name: string;
  rolePermissions: PermissionProps[];
}

interface UserDataProps {
  id: string;
  name: string;
  email: string;
  division: DivisionProps;
  department: DepartmentProps;
  employee: EmployeeDataProps;
  role: RoleProps[];
}

interface UserProps {
  User: UserDataProps;
}

interface UsersProps {
  Users: UserDataProps[];
}

interface TokenProps {
  token: string;
  refreshToken: string;
}
interface AccessTokenProps {
  token: string;
  refreshToken: string;
}

interface UserPermissions {
  GET_DASHBOARD: string;
  MAKE_COMMENT: string;
  MAKE_HOD_COMMENT: string;
  GET_ABOUT: string;
  GET_POLICY_GUIDELINES: string;
  GET_REPORT: string;
  GET_DEPARTMENT_REPORT: string;
  SEND_BULK_EMAIL: string;
  SEND_EMAIL_BY_DEPARTMENT: string;
  READ_ALL_USERS: string;
  READ_USER: string;
  UPDATE_USER: string;
  CREATE_USER: string;
  DELETE_USER: string;
  READ_EMPLOYEE: string;
  UPDATE_EMPLOYEE: string;
  CREATE_EMPLOYEE: string;
  DELETE_EMPLOYEE: string;
  READ_DEPT: string;
  UPDATE_DEPT: string;
  CREATE_DEPT: string;
  DELETE_DEPT: string;
  READ_ALL_APPRAISAL: string;
  READ_APPRAISAL: string;
  CREATE_APPRAISAL: string;
  UPDATE_APPRAISAL: string;
  APPRAISE_EMPLOYEE: string;
  DELETE_APPRAISAL: string;
  READ_APPRAISAL_TIMELINE: string;
  UPDATE_APPRAISAL_TIMELINE: string;
  CREATE_APPRAISAL_TIMELINE: string;
  DELETE_APPRAISAL_TIMELINE: string;
  READ_PERMISSIONS: string;
  READ_ROLES: string;
  UPDATE_ROLES: string;
  CREATE_ROLES: string;
  DELETE_ROLES: string;
  READ_QUALIFICATIONS: string;
  UPDATE_QUALIFICATIONS: string;
  CREATE_QUALIFICATIONS: string;
  DELETE_QUALIFICATIONS: string;
}

interface AccessTokenExpired {
  error: string;
}
