import { EnumRole } from './role.enum';

export interface User {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: EnumRole;
  fullName: string;
}
