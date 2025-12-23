import { useState } from 'react';
import { useUser } from './context/UserContext.jsx';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import styles from '../LoginPage.module.css';

const LS_KEY = 'profiles';

function LoginPage({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const { setUser } = useUser();

  const handleChange = (e) => setName(e.target.value);

  const handleLoginClick = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      alert('Имя должно быть не короче 2 символов');
      return;
    }

    let profiles = [];
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

    setUser({ name: trimmed });      // записываем в контекст
    alert('Вы успешно вошли');
    onLoginSuccess?.();
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

export default LoginPage;