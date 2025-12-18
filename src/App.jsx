import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout.jsx';
import Title from './components/Title/Title.jsx';
import Paragraph from './components/Paragraph/Paragraph.jsx';
import Search from './components/Search/Search.jsx';
import MoviesList from './components/MovieList/MovieList.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';

const LS_KEY = 'profiles';

function App() {
  const [screen, setScreen] = useState('search');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const profiles = JSON.parse(raw);
      const logged = profiles.find(p => p.isLoggedIn);
      if (logged) {
        setCurrentUser({ name: logged.name });
      }
    } catch (e) {
      console.error('Ошибка чтения профилей', e);
    }
  }, []);

  const handleSearch = (query) => {
    console.log('Ищем фильм:', query);
  };

  const handleLogout = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const profiles = JSON.parse(raw).map(p => ({
          ...p,
          isLoggedIn: false,
        }));
        localStorage.setItem(LS_KEY, JSON.stringify(profiles));
      }
    } catch (e) {
      console.error('Ошибка сброса профилей', e);
    }
    setCurrentUser(null);
    setScreen('search');
  };

  const handleLoginSuccess = (name) => {
    setCurrentUser({ name });
    setScreen('search');
  };

  return (
    <Layout
      userName={currentUser?.name}
      onLogout={handleLogout}
      onLoginClick={() => setScreen('login')}
    >
      {screen === 'search' && (
        <section className="page">
          <Title>Поиск</Title>
          <Paragraph size="medium">
            Введите название фильма, сериала или мультфильма для поиска и добавления в избранное.
          </Paragraph>
          <Search onSearch={handleSearch} />
          <MoviesList />
        </section>
      )}

      {screen === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </Layout>
  );
}

export default App;
