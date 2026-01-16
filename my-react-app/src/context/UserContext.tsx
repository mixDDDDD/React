import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const LS_KEY = 'profiles';

export type User = {
  name: string;
};

type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;

      const profiles = JSON.parse(raw);
      const logged = profiles.find((p: any) => p.isLoggedIn);
      if (logged) {
        setUser({ name: logged.name });
      }
    } catch (e) {
      console.error('Ошибка чтения профилей', e);
    }
  }, []);

  const logout = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const profiles = JSON.parse(raw).map((p: any) => ({
          ...p,
          isLoggedIn: false,
        }));
        localStorage.setItem(LS_KEY, JSON.stringify(profiles));
      }
    } catch (e) {
      console.error('Ошибка сброса профилей', e);
    }
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }
  return ctx;
}