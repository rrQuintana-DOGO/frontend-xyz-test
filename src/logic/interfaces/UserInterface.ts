import { Permission } from "./PermissionInterface";
import { RoleInteface } from "./RoleInterface";
import { TimeZoneInterface } from "./TimeZonesInterface";

export interface UserInterface {
  id_user: string;
  name: string;
  email: string;
  email_verified: boolean;
  phone: string;
  phone_verified: boolean;
  id_credential: string | null;
  id_time_zone: string;
  credentials: never;
  time_zones: TimeZoneInterface;
  permissions: Permission[];
  roles: RoleInteface[];
}