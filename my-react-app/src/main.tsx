// main.tsx
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Layout from './Layout/Layout';
import Title from './components/Title/Title';
import Paragraph from './components/Paragraph/Paragraph';
import Search from './components/Search/Search';
import MovieList from './components/MovieList/MovieList';
import LoginPage from './components/LoginPage/LoginPage';
import { movieImages } from './moviesImages';
import { useUser } from './context/UserContext'; // ваш UserContext

// Главная страница (бывший screen='search')
const Home = () => {
  const handleSearch = (query: string) => {
    console.log('Ищем фильм:', query);
  };

  return (
    <section className="page">
      <Title>Поиск</Title>
      <Paragraph size="medium">
        Введите название фильма, сериала или мультфильма для поиска и добавления в избранное.
      </Paragraph>
      <Search onSearch={handleSearch} />
      <MovieList movies={movieImages} />
    </section>
  );
};

// Страница логина
const LoginPageRoute = () => {
  const handleLoginSuccess = () => {
    // логика после логина
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
};

// Страница фильма
const Movie = () => <div>Movie Page</div>;

// Избранное
const Favorites = () => <div>Favorites Page</div>;

function App() {
  const { user, logout } = useUser();
  const handleLoginClick = useCallback(() => {
    // переход на /login происходит автоматически через NavLink
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout
          userName={user?.name}
          onLogout={logout}
          onLoginClick={handleLoginClick}
        />
      ),
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <LoginPageRoute /> },
        { path: 'movie/:id', element: <Movie /> },
        { path: 'favorites', element: <Favorites /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);