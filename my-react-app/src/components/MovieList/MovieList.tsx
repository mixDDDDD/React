import MovieCard from '../MovieCard/MovieCard.js';
import styles from './MovieList.module.css';

type Movie = {
  id: number;
  src: string;
  alt: string;
};

type MoviesListProps = {
  movies: Movie[];
};

function MoviesList({ movies }: MoviesListProps) {
  return (
    <section className={styles.moviesList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          src={movie.src}
          alt={movie.alt}
        />
      ))}
    </section>
  );
}

export default MoviesList;