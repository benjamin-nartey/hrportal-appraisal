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

interface EmployeeProps {
  id: string;
  staffNo: string;
  supervisorId: string | null;
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
  employee: EmployeeProps;
  role: RoleProps[];
}

interface UserProps {
  User: UserDataProps;
}

interface TokenProps {
  token: string;
}
interface AccessTokenProps {
  accessToken: string;
}

interface UserPermissions {
  READ_ALL_USERS: string;
  READ_USER: string;
  READ_DEPT: string;
  READ_APPRAISAL: string;
  CREATE_APPRAISAL: string;
  UPDATE_APPRAISAL: string;
  CREATE_USER: string;
  UPDATE_USER: string;
  DELETE_USER: string;
  READ_EMPLOYEE: string;
  CREATE_EMPLOYEE: string;
  UPDATE_EMPLOYEE: string;
  DELETE_EMPLOYEE: string;
  CREATE_DEPT: string;
  UPDATE_DEPT: string;
  DELETE_DEPT: string;
  READ_ALL_APPRAISAL: string;
  DELETE_APPRAISAL: string;
  READ_ROLES: string;
  CREATE_ROLES: string;
  UPDATE_ROLES: string;
  DELETE_ROLES: string;
  READ_QUALIFICATIONS: string;
  CREATE_QUALIFICATIONS: string;
  UPDATE_QUALIFICATIONS: string;
  DELETE_QUALIFICATIONS: string;
}

interface AccessTokenExpired {
  error: string;
}
