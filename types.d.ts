interface LoginProps {
  email: string;
  password: string;
}

interface DepartmentProps {
  id: string;
  departmentName: string;
  divisionId: string;
}

interface DepartmentsDataProps {
  departments: DepartmentProps[];
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

interface EmployeeProps {
  user: {
    id: string;
    name: string;
    email: string;
    division: DivisionProps;
  };
  id: string;
  staffNo: string;
  supervisor: {
    id: string;
    user: {
      name: string;
    };
  };
  dateOfBirth: string;
  dateOfAppointment: string;
  dateOfLastPromotion: string;
  stateOfEmployee: string;
  location: {
    id: string;
    name: string;
  };
  designation: DesignationProps;
  department: DepartmentProps;
  qualification: {
    id: string;
    name: string;
  };
}

interface AllEmployeesProps {
  Employees: EmployeeProps[];
  totalEmployees: number;
  totalPages: number;
  currentPage: number;
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

interface RoleDataProps {
  data: RoleProps[];
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

interface CreateUserDataProps {
  name: string;
  email: string;
  departmentId: string;
  roleId: string[];
}

interface CreatedUserResponseProps {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    division: DivisionProps;
    department: DepartmentProps;
    role: { id: string; name: string };
  };
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
