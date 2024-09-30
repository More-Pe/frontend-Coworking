import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, Passport } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthorization = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPassport = localStorage.getItem('passport');
    if (storedPassport) {
      const passport: Passport = JSON.parse(storedPassport);
      setToken(passport.token);
      setIsLoggedIn(true);
      setIsAdmin(passport.tokenData.role === 'super_admin');
    }
  }, []);

  const setSessionData = (passport: Passport) => {
    setToken(passport.token);
    setIsLoggedIn(true);
    setIsAdmin(passport.tokenData.role === 'super_admin');
    localStorage.setItem('passport', JSON.stringify(passport));
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('passport');
    navigate('/login');
  };

  return { token, isLoggedIn, isAdmin, setSessionData, logout };
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};