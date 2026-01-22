import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/userSlice';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './LoginPage.module.css';

const LS_KEY = 'profiles';

export default function LoginPage() {
  const [name, setName] = useState('');
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
    } catch {}

    profiles = profiles.map((p) =>
      p.name === trimmed
        ? { ...p, isLoggedIn: true }
        : { ...p, isLoggedIn: false }
    );

    if (!profiles.some((p) => p.name === trimmed)) {
      profiles.push({ name: trimmed, isLoggedIn: true });
    }

    localStorage.setItem(LS_KEY, JSON.stringify(profiles));

    dispatch(login(trimmed));
    navigate('/');
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Вход</h1>
      <Input
        value={name}
        onChange={handleChange}
        placeholder="Ваше имя"
      />
      <Button onClick={handleLoginClick}>Войти</Button>
    </section>
  );
}
