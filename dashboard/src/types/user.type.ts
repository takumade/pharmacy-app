export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  clearText: string;
  role: string;
  isVerified: boolean;
  isDeleted: boolean;
  avatar: string;
  verificationImage: string;
};


export enum UserRoles {
  admin = "admin",
  pharmacy = "pharmacy",
  customer = "customer"
}

