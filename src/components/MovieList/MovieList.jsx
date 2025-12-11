import { movieImages } from 'src/moviesImages.js';
import MovieCard from './MovieCard.jsx';

function MoviesList() {
  return (
    <section className="movies-list">
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