import { movieImages } from './moviesImages';

function MoviesList() {
  return (
    <section className="movies-list">
      {movieImages.map((movie) => (
        <img
          key={movie.id}
          className="movies-list__poster"
          src={movie.src}
          alt={movie.alt}
        />
      ))}
    </section>
  );
}

export default MoviesList;