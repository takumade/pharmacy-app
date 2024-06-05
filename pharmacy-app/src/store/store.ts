import {create} from 'zustand';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
const produce = require('immer').produce;
import CartItems from '../components/CartItems';
interface SearchMedicine {
  id: number;
  genericName: string;
  // Add other properties as needed
}

interface Price {
  size: string;
  quantity: number;
}

interface CartItem {
  _id: string;
  medicineName: string;
  image: string;
  prices: Price[];
  unitPrice: number;
  quantity: number;
}
interface CartState {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: string) => void;
  incrementItemQuantity: (itemId: string) => void;
  decrementItemQuantity: (itemId: string) => void;
  clearCart: () => void;
}

interface StoreState {
  addItemToCart: any;
  medicines: SearchMedicine[];
  searchMedicines: (name: string) => Promise<void>;
}

const useAuthStore = create((set) => ({
  token: null,
  setToken: (newToken: any) => set({ token: newToken }),
}));

const useStore = create<StoreState>((set, get) => ({
  medicines: [],
  cartItems: [],

  addItemToCart: (item: CartItem) => {
    set(
      produce((draft: CartState) => {
        const existingItem = draft.cartItems.find(
          cartItem => cartItem._id === item._id,
        );
        if (!existingItem) {
          draft.cartItems.push(item);
        }
      }),
    );
  },

  incrementItemQuantity: (itemId: string) => {
    set(
      produce((draft: CartState) => {
        const item = draft.cartItems.find(item => item._id === itemId);
        if (item) {
          item.quantity++;
        }
      }),
    );
  },

  decrementItemQuantity: (itemId: string) => {
    set(
      produce((draft: CartState) => {
        const item = draft.cartItems.find(item => item._id === itemId);
        if (item && item.quantity > 1) {
          item.quantity--;
        }
      }),
    );
  },
  removeItemFromCart: (itemId: string) => {
    set(
      produce((draft: CartState) => {
        draft.cartItems = draft.cartItems.filter(item => item._id !== itemId);
      }),
    );
  },
  
  clearCart: () => {
    set(
      produce((draft: CartState) => {
        draft.cartItems = [];
      }),
    );
  },
  
  searchMedicines: async (name: string) => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM3ZmViMmIyZDBmYTQwYmYxZmJiNzEiLCJyb2xlIjoicGhhcm1hY3kiLCJpYXQiOjE3MTU5MzIyMDh9.BpC5K53mC2d8lSbYfQvnTF3sJ0NgSG11oKx6aDt5NNg';
      const response = await axios.get(
        `http://172.18.224.1:3000/api/medicine/search?name=${name}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;

      set({medicines: data});
    } catch (error) {
      console.error('Error searching medicines:', error);
    }
  },
}));

export default useStore;


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