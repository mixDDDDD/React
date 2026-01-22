import MovieList from '../components/MovieList/MovieList';
import { useAppSelector } from '../hooks/useAppSelector';

export default function Favorites() {
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  if (!favorites.length) {
    return <p>Избранных фильмов нет</p>;
  }

  return <MovieList movies={favorites} />;
}