import { useState } from 'react';
import Layout from './components/Layout/Layout.jsx';
import Title from './components/Title/Title.jsx';
import Paragraph from './components/Paragraph/Paragraph.jsx';
import Input from './components/Input/Input.jsx';
import Button from './components/Button/Button.jsx';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleLoginClick = () => {
    console.log('Войти в профиль с именем:', name);
  };

  return (
    <Layout>
      <section className={styles.page}>
        <Title>Вход</Title>
        <Paragraph size="medium">Ваше имя</Paragraph>

        <Input
          placeholder="Ваше имя"
          value={name}
          onChange={handleChange}
        />

        <Button onClick={handleLoginClick}>
          Войти в профиль
        </Button>
      </section>
    </Layout>
  );
}

export default LoginPage;