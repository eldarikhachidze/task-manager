import {Role} from "./role";

export interface User {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: Role[];
  projects: string[];
}
