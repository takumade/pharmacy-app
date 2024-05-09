import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthResponse {
  error: boolean;
  msg: any;
}

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<AuthResponse | undefined>;
  onLogin?: (email: string, password: string) => Promise<AuthResponse | undefined>;
  onLogout?: () => Promise<void>;
}

const headers = {
  "Content-Type": "application/json",
  
};
const TOKEN_KEY = "token";
export const API_URL = "{your ip address}:3000/api/user";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    // Load token from secure storage when the component mounts
    const loadToken = async () => {
      try {
        const token = await EncryptedStorage.getItem(TOKEN_KEY);
        if (token) {
          setAuthState({ token, authenticated: true });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error loading token:', error);
      }
    };

    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users`, { email, password });
      console.log("response", response);
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

 const login = async (email: string, password: string) => {
    try {  const response = await axios.post(
        `${API_URL}/login`, 
        { email, password },
        { headers: headers }
      );
      console.log("Login successful", response);
      const { token } = response.data;
      setAuthState({ token, authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await EncryptedStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.log("Login failed")
        console.log(error)
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const logout = async () => {
    try {
      await EncryptedStorage.removeItem(TOKEN_KEY);
      setAuthState({ token: null, authenticated: false });
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;