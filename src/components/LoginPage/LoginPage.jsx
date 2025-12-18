import { useState, useEffect, useRef  } from 'react';
import Layout from './components/Layout/Layout.jsx';
import Title from './components/Title/Title.jsx';
import Paragraph from './components/Paragraph/Paragraph.jsx';
import Input from './components/Input/Input.jsx';
import Button from './components/Button/Button.jsx';
import styles from './LoginPage.module.css';

const LS_KEY = 'profiles';

function LoginPage() {
  const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;

    try {
      const profiles = JSON.parse(raw);
      const lastLogged = profiles.find((p) => p.isLoggedIn);
      if (lastLogged) {
        setCurrentUser({ name: lastLogged.name });
        setName(lastLogged.name);
      }
    } catch {
      
    }
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleLoginClick = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const raw = localStorage.getItem(LS_KEY);
    let profiles = [];

    if (raw) {
      try {
        profiles = JSON.parse(raw);
      } catch {
        profiles = [];
      }
    }

    profiles = profiles.map((p) =>
      p.name === trimmed
        ? { ...p, isLoggedIn: true }
        : { ...p, isLoggedIn: false }
    );

    const exists = profiles.find((p) => p.name === trimmed);
    if (!exists) {
      profiles.push({ name: trimmed, isLoggedIn: true });
    }

    localStorage.setItem(LS_KEY, JSON.stringify(profiles));
    setCurrentUser({ name: trimmed });

    console.log('Войти в профиль с именем:', trimmed);
  };

  const handleLogoutClick = () => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const profiles = JSON.parse(raw).map((p) => ({
          ...p,
          isLoggedIn: false,
        }));
        localStorage.setItem(LS_KEY, JSON.stringify(profiles));
      } catch {
        
      }
    }

    setCurrentUser(null);
    setName('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Layout
      userName={currentUser?.name}
      onLogout={handleLogoutClick}
      onLoginClick={() => {
        inputRef.current?.focus();
      }}
    >
      <section className={styles.page}>
        <h1 className={styles.title}>Вход</h1>

        <Input
          ref={inputRef}
          placeholder="Ваше имя"
          value={name}
          onChange={handleChange}
        />

        <Button onClick={handleLoginClick}>
          Войти в профиль
        </Button>

        {currentUser && (
          <p className={styles.info}>
            Вы вошли как: <strong>{currentUser.name}</strong>
          </p>
        )}
      </section>
    </Layout>
  );
}

export default LoginPage;