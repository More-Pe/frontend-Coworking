import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, Passport } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthorization = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser , setIsUser ] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passport, setPassport] = useState<Passport | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPassport = localStorage.getItem('passport');
    if (storedPassport) {
      const passport: Passport = JSON.parse(storedPassport);
      setToken(passport.token);
      setIsLoggedIn(true);
      setIsUser(passport.tokenData.role === 'user');
      setIsAdmin(passport.tokenData.role === 'admin');
    }
  }, []);

  const setSessionData = (passport: Passport) => {
    setToken(passport.token);
    setIsLoggedIn(true);
    setIsUser (passport.tokenData.role === 'user');
    setIsAdmin(passport.tokenData.role === 'admin');
    setPassport(passport); 
    localStorage.setItem('passport', JSON.stringify(passport));
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setIsUser(false);
    setIsAdmin(false);
    localStorage.removeItem('passport');
    navigate('/login');
  };

  return { passport, token, isLoggedIn, isUser, isAdmin, setSessionData, logout };
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be use inside of AuthProvider');
  }
  return context;
};