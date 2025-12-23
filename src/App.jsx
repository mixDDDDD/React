import { useState } from 'react';
import { useUser } from './context/UserContext.jsx';
import Layout from './components/Layout/Layout.jsx';
import Title from './components/Title/Title.jsx';
import Paragraph from './components/Paragraph/Paragraph.jsx';
import Search from './components/Search/Search.jsx';
import MoviesList from './components/MovieList/MovieList.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';

function App() {
  const { user, logout } = useUser();
  const [screen, setScreen] = useState('search');

  const handleSearch = (query) => {
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