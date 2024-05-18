import { User } from "./user.type";
import { Pharmacy } from "./pharmacy.type";



export interface Order {
  _id: string;
  userId: User;
  pharmacyId: Pharmacy;
  items: Array<any>; // You may want to specify the type of items if you have a specific structure for them
  prescriptions: Array<any>; // You may want to specify the type of prescriptions if you have a specific structure for them
  totalAmount: number;
  status: string;
  shippingAddress: {
    // Define the structure of the shipping address object
    // You can add more fields as needed
    // Example:
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: string;
  transactionId: string;
  orderDate: string; // Assuming the date is represented as a string
};
