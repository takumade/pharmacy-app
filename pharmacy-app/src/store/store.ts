import { create } from 'zustand';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
const produce = require("immer").produce;
import CartItems from '../components/CartItems';
interface SearchMedicine {
  id: number;
  genericName: string;
  // Add other properties as needed
}

interface Price {
  size: string,
  quantity: number
}

interface CartItem {
  _id: string;
  medicineName: string;
  image: string;
  prices: Price[];
  unitPrice: number;
}
interface CartState {
  cartItems: CartItem [];
  addItemToCart: (item: CartItem) => void;
}

interface StoreState {
  addItemToCart: any;
  medicines: SearchMedicine[];
  searchMedicines: (name: string) => Promise<void>;
}

const useStore = create<StoreState>((set,get) => ({
  medicines: [],
  cartItems:[],

  addItemToCart: (item: CartItem) => {
    set(
      produce((draft: CartState) => {
        const existingItem = draft.cartItems.find(
          (cartItem) => cartItem._id === item._id
        );
        if (!existingItem) {
          draft.cartItems.push(item);
        }
      })
    );
  },

  //to reuse the code later so that its sorts the items when adding to cart 
  // addItemToCart: (item: CartItem) => {
  //   set(
  //     produce((draft: CartState) => {
  //       const existingItem = draft.cartItems.find(
  //         (cartItem) => cartItem._id === item._id
  //       );

  //       if (existingItem) {
  //         (item.prices || []).forEach((itemPrice) => {
  //           const existingPrice = existingItem.prices.find(
  //             (unitPrice) => unitPrice.size === itemPrice.size
  //           );

  //           if (existingPrice) {
  //             existingPrice.quantity++;
  //           } else {
  //             existingItem.prices.push({ ...itemPrice, quantity: 1 });
  //           }
  //         });

  //         existingItem.prices.sort((a, b) => b.size.localeCompare(a.size));
  //       } else {
  //         const newItem: CartItem = {
  //           ...item,
  //           prices: (item.prices || []).map((unitPrice) => ({ ...unitPrice, quantity: 1 })),
  //         };
  //         draft.cartItems.push(newItem);
  //       }
  //     })
  //   );
  // },
  searchMedicines: async (name: string) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM3ZmViMmIyZDBmYTQwYmYxZmJiNzEiLCJyb2xlIjoicGhhcm1hY3kiLCJpYXQiOjE3MTU4MDEyNTd9.hpGnTT60zKe2rZlfYsD3q360Rl3JU0L-0G-3aahZT18';
      const response = await axios.get(`http://192.168.100.3:3000/api/medicine/search?name=${name}`, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      
      set({ medicines: data });
      
    } catch (error) {
      console.error('Error searching medicines:', error);
    }
  },
}));

export default useStore;


