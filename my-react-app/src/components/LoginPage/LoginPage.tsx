import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './LoginPage.module.css';

const LS_KEY = 'profiles';

type LoginPageProps = {
  onLoginSuccess?: () => void;
};

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [name, setName] = useState('');
  const { setUser } = useUser();
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
    alert('Вы успешно вошли');
    
    onLoginSuccess?.();
    
    navigate('/');
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Вход</h1>
      <Input
        placeholder="Ваше имя"
        value={name}
        onChange={handleChange}
      />
      <Button onClick={handleLoginClick}>
        Войти в профиль
      </Button>
    </section>
  );
}