import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = () => {
    setIsLoading(true);
    setUser('Sachin');
    setUserToken('abcdefg');
    AsyncStorage.setItem('userToken', 'abcdefg');
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setUser('Sachin');
      setIsLoading(false);
    } catch (err) {
      console.log('Is Logged In error ', err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, userToken, user}}>
      {children}
    </AuthContext.Provider>
  );
};
