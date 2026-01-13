import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Movie from './pages/Movie';
import Favorites from './pages/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      {
        path: 'movie/:id',
        element: <Movie />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://search.imdbot.workers.dev/?t=${params.id}`
          );

          if (!response.ok) {
            throw new Response('Фильм не найден', { status: 404 });
          }

          return response.json();
        },
      },
      { path: 'favorites', element: <Favorites /> },
    ],
  },
]);