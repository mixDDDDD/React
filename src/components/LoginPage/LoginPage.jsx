import { useState } from 'react';
import Layout from './Layout.jsx';
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';
import Input from './Input.jsx';
import Button from './Button.jsx';

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
      <section className="page">
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