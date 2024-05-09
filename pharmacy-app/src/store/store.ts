import {create} from 'zustand';

interface userData {

  name: string;
  email: string;
  password: string;
  // Add other properties as needed
}


interface StoreState {
  items: userData[];
  getItems: () => Promise<void>;
  signInUser: (userData: userData) => Promise<void>;
  signUpUser: (userData: userData) => Promise<void>;
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
  
  signInUser: async (userData: userData) => {
    try {
      const response = await fetch('https://your-api-endpoint.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Sign in failed');
      }

      const data = await response.json();
      // Handle the response data as needed (e.g., store the user token)
      console.log('Sign in successful:', data);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  },

  signUpUser: async (userData: userData) => {
    try {
      const response = await fetch('https://your-api-endpoint.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log('Sign up successful:', data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  },


}));

export default useStore;