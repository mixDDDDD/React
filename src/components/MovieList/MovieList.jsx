import { movieImages } from '../../moviesImages.js';
import MovieCard from '../MovieCard/MovieCard.jsx';
import styles from './MovieList.module.css';

function MoviesList() {
  return (
    <section className={styles.moviesList}>
      {movieImages.map((movie) => (
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