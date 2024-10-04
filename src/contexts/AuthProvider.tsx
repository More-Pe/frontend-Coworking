import { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthorization } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthorization();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};