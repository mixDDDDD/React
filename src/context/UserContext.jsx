import { createContext, useContext, useEffect, useState } from 'react';

const LS_KEY = 'profiles';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;

      const profiles = JSON.parse(raw);
      const logged = profiles.find((p) => p.isLoggedIn);
      if (logged) {
        setUser({ name: logged.name });
      }
    } catch (e) {
      console.error('Ошибка чтения профилей из localStorage', e);
    }
  }, []);

  const logout = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const profiles = JSON.parse(raw).map((p) => ({
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

export function useUser() {
  return useContext(UserContext);
}