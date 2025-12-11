function MovieCard({ src, alt }) {
  return (
    <img className="movies-list__poster" src={src} alt={alt} />
  );
}

export default MovieCard;