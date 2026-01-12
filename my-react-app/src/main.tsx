import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import { movieImages } from './data/moviesImages';
import Title from './components/Title/Title';
import Paragraph from './components/Paragraph/Paragraph';
import Search from './components/Search/Search';
import MovieList from './components/MovieList/MovieList';
import LoginPage from './components/LoginPage/LoginPage';
import Movie from './pages/Movie';
import Favorites from './pages/Favorites';
import { UserProvider } from './context/UserContext';

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

function App() {
  return (
    <UserProvider>
      <RouterProvider 
        router={createBrowserRouter([
          {
            path: '/',
            element: <Layout />,
            children: [
              { index: true, element: <Home /> },
              { path: 'login', element: <LoginPage /> },
              { 
                path: 'movie/:id', 
                element: <Movie />,
                loader: async (args) => {
                  const { params } = args;
                  const response = await fetch(`https://search.imdbot.workers.dev/?t=${params.id}`);
                  if (!response.ok) {
                    throw new Response('Фильм не найден', { status: 404 });
                  }
                  return response.json();
                }
              },
              { path: 'favorites', element: <Favorites /> },
            ],
          },
        ])}
      />
    </UserProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);