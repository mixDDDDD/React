import { useState } from 'react';
import { movieImages } from './moviesImages';
import Layout from './components/Layout/Layout';
import Title from './components/Title/Title';
import Paragraph from './components/Paragraph/Paragraph';
import Search from './components/Search/Search';
import MovieList from './components/MovieList/MovieList';
import LoginPage from './components/LoginPage/LoginPage';
import { useUser } from './context/UserContext';

type Screen = 'search' | 'login';

function App() {
  const { user, logout } = useUser();
  const [screen, setScreen] = useState<Screen>('search');

  const handleSearch = (query: string) => {
    console.log('Ищем фильм:', query);
  };

  const handleLoginSuccess = () => {
    setScreen('search');
  };

  return (
    <Layout
      userName={user?.name}
      onLogout={logout}
      onLoginClick={() => setScreen('login')}
    >
      {screen === 'search' && (
        <section className="page">
          <Title>Поиск</Title>
          <Paragraph size="medium">
            Введите название фильма, сериала или мультфильма для поиска и добавления в избранное.
          </Paragraph>

          <Search onSearch={handleSearch} />
          <MovieList movies={movieImages} />
        </section>
      )}

      {screen === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </Layout>
  );
}

export default App;