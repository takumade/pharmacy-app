import { create } from 'zustand';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

interface SearchMedicine {
  id: number;
  genericName: string;
  // Add other properties as needed
}

interface StoreState {
  medicines: SearchMedicine[];
  searchMedicines: (name: string) => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  medicines: [],
  searchMedicines: async (name: string) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM3ZmViMmIyZDBmYTQwYmYxZmJiNzEiLCJyb2xlIjoicGhhcm1hY3kiLCJpYXQiOjE3MTU2NDExMDZ9.njhHhTSVzhwkuYxasIKfFh9LFLVhPg18fXd2mHXRt8E';
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


