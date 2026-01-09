import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  userName: string | undefined;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string | undefined>();

  const login = () => setUserName('User');
  const logout = () => setUserName(undefined);

  return (
    <AuthContext.Provider value={{ userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};