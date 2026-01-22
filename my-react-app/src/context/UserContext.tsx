import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setUser as setReduxUser } from '../store/userSlice';
import { setFavorites, getFavoritesKey } from '../store/favoritesSlice';

const LS_KEY = 'profiles';

export type User = {
  name: string;
};

type UserContextValue = {
  user: User | null;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;

    const profiles = JSON.parse(raw);
    const logged = profiles.find((p: any) => p.isLoggedIn);

    if (!logged?.name) return;

    setUser({ name: logged.name });
    dispatch(setReduxUser(logged.name));

    const favRaw = localStorage.getItem(
      getFavoritesKey(logged.name)
    );

    dispatch(setFavorites(favRaw ? JSON.parse(favRaw) : []));
  }, [dispatch]);

  const logout = () => {
    dispatch(setReduxUser(null));
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser outside provider');
  return ctx;
}
