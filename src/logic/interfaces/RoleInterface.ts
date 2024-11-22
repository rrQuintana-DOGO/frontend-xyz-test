import { Permission } from "./PermissionInterface";

export interface RoleInteface {
  id_role: string;
  name: string;
  description: string;
  status: boolean;
  permissions: Permission[];
}