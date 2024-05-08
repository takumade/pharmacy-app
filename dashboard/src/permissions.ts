


import { RolePerm } from "./types/permissions"


export const medicinePerms: RolePerm[] = [
    {
      role: 'pharmacy',
      view: true,
      delete: true,
      edit: true
    }
]


export const orderPerms: RolePerm[] = [
  {
    role: 'pharmacy',
    view: true,
    delete: true,
    // edit: true
  }
]

export const txnPerms: RolePerm[] = [
  {
    role: 'pharmacy',
    view: true,
    delete: true,
    edit: true
  }
]
export const prescriptionPerms: RolePerm[] = [
  {
    role: 'pharmacy',
    view: true,
    delete: true,
    // edit: true
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

  if (role === "pharmacy" && page === "orders")
    return orderPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

  if (role === "pharmacy" && page === "prescriptions")
    return prescriptionPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

  if (role === "pharmacy" && page === "transactions")
    return txnPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

 return {
  role: role,
  view: false,
  delete: false,
  edit: false
 }
}
