import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAppDispatch } from '../../store/hooks';
import { setFavorites } from '../../store/favoritesSlice';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './LoginPage.module.css';

const LS_KEY = 'profiles';

const getFavoritesKey = (username: string) => `favorites:${username}`;

export default function LoginPage() {
  const [name, setName] = useState('');
  const { setUser } = useUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLoginClick = () => {
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      alert('Имя должно быть не короче 2 символов');
      return;
    }

    let profiles: Array<{ name: string; isLoggedIn?: boolean }> = [];

    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) profiles = JSON.parse(raw);
    } catch (e) {
      console.error('Ошибка чтения профилей', e);
    }

    profiles = profiles.map((p) =>
      p.name === trimmed
        ? { ...p, isLoggedIn: true }
        : { ...p, isLoggedIn: false }
    );

    if (!profiles.some((p) => p.name === trimmed)) {
      profiles.push({ name: trimmed, isLoggedIn: true });
    }

    try {
      localStorage.setItem(LS_KEY, JSON.stringify(profiles));
    } catch (e) {
      console.error('Ошибка записи профилей', e);
    }

    setUser({ name: trimmed });

    const favRaw = localStorage.getItem(getFavoritesKey(trimmed));
    dispatch(setFavorites(favRaw ? JSON.parse(favRaw) : []));

    navigate('/');
  };

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Вход</h1>
          <Input
            className={styles.input}
            placeholder="Ваше имя"
            value={name}
            onChange={handleChange}
          />

          <Button
            className={styles.button}
            onClick={handleLoginClick}
          >
            Войти в профиль
          </Button>
      </div>
    </section>
  );
}
