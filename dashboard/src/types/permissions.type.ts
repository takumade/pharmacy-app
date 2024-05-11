export interface Permissions {
  view?: boolean,
  delete?: boolean,
  edit?: boolean
}


export interface RolePerm {
  role: string
  view?: boolean
  edit?: boolean
  delete?: boolean
}
