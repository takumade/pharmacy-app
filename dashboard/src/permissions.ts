


import { RolePerm } from "./types/permissions"


export const medicinePerms: RolePerm[] = [
    {
      role: 'pharmacy',
      view: true,
      delete: true,
      edit: true
    }
]


const defaultAdminRole: RolePerm = {
  role: "admin",
  view: true,
  delete: true,
  edit: true
}


export const getPermissions = (role:string, page: string): RolePerm => {

  if (role == "admin") return defaultAdminRole


  if (role === "pharmacy" && page === "medicine")
        return medicinePerms.find((p:RolePerm)=> p.role === role) as RolePerm;

 return {
  role: role,
  view: false,
  delete: false,
  edit: false
 }
}
