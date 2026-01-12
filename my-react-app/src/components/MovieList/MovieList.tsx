import { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

type MoviesListProps = {
  movies: Movie[];
};

function MovieList({ movies }: MoviesListProps) {
  return (
    <section className={styles.moviesList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          src={movie.image}
          alt={movie.title}
        />
      ))}
    </section>
  );
}

export default MovieList;