import {create} from 'zustand';

interface Item {
  _id: number;
  name: string;
  // Add other properties as needed
}

interface StoreState {
  items: Item[];
  getItems: () => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  items: [],
  getItems: async () => {
    try {
      const response = await fetch('https://cat-fact.herokuapp.com/facts');
      const data = await response.json();
   
      set({ items: data });
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  },
}));

export default useStore;