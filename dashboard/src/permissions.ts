


import { RolePerm } from "./types/permissions.type"
import { UserRoles } from "./types/user.type"


export const medicinePerms: RolePerm[] = [
    {
      role: UserRoles.pharmacy,
      view: true,
      delete: true,
      edit: true
    }
]


export const orderPerms: RolePerm[] = [
  {
    role: UserRoles.pharmacy,
    view: true,
    delete: true,
    // edit: true
  }
]

export const txnPerms: RolePerm[] = [
  {
    role: UserRoles.pharmacy,
    view: true,
    delete: true,
    edit: true
  }
]
export const prescriptionPerms: RolePerm[] = [
  {
    role: UserRoles.pharmacy,
    view: true,
    delete: true,
    // edit: true
  }
]

export const userPerms: RolePerm[] = [
  {
    role: UserRoles.pharmacy,
    view: false,
    delete: false
    // edit: true
  }
]

export const pharmaciesPerms: RolePerm[] = [
  {
    role: UserRoles.pharmacy,
    view: false,
    delete: false,
    edit: true
  },

]
export const applicationsPerms: RolePerm[] = [
  {
    role: UserRoles.pharmacy,
    view: true,
    delete: true,
    edit: true
  },
  {
    role: UserRoles.admin,
    view: true,
    delete: true
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

  console.log("Permissions: ", {
    role, page
  })




  if (role === UserRoles.pharmacy){

    if (page === "medicine")
      return medicinePerms.find((p:RolePerm)=> p.role === role) as RolePerm;

    if (page === "orders")
      return orderPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

    if (page === "prescriptions")
      return prescriptionPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

    if (page === "transactions")
      return txnPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

    if (page === "users")
      return userPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

    if (page === "pharmacies")
      return pharmaciesPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

    if (page === "applications")
      return applicationsPerms.find((p:RolePerm)=> p.role === role) as RolePerm;
  }


  if (role === UserRoles.admin){
      if (page === "applications")
        return applicationsPerms.find((p:RolePerm)=> p.role === role) as RolePerm;

      return defaultAdminRole
   }

 return {
  role: role,
  view: false,
  delete: false,
  edit: false
 }
}
