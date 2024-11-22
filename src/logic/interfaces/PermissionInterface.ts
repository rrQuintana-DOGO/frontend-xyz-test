export interface Permission {
  id_permission: string;
  name: string;
  params: {
    [key: string]: never;
  };
  status: boolean;
}