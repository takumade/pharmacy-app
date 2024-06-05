import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const useFetchMedicines = () => {
  const { authState } = useAuth();

  const searchMedicines = async (name: string) => {
    try {
      const token = authState.token;

      if (!token) {
        console.error('Token not available');
        return;
      }

      const response = await axios.get(`http://192.3:3000/api/medicine/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;

      return data;
    } catch (error) {
      console.error('Error searching medicines:', error);
      throw error;
    }
  };

  return { searchMedicines };
};

export default useFetchMedicines;