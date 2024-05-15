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
  id: string;
  medicineName: string;
  image: string;
  prices: Price[];
  price: number;
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

 addItemToCart: (item:any) => {
    set(
      produce((draft: CartState) => {
        const existingItem = draft.cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          const existingPrice = existingItem.prices.find(
            (price) => price.size === item.prices[0].size
          );
          if (existingPrice) {
            existingPrice.quantity++;
          } else {
            existingItem.prices.push({ ...item.prices[0], quantity: 1 });
            existingItem.prices.sort((a, b) => b.size.localeCompare(a.size));
          }
        } else {
          draft.cartItems.push({
            ...item,
            prices: [{ ...item.prices, quantity: 1 }],
          });
        }
      })
    );
  },
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


