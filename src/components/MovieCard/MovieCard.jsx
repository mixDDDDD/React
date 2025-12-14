import styles from './MovieCard.module.css';

function MovieCard({ src, alt }) {
  return (
    <img className={styles['movies-list__poster']} src={src} alt={alt} />
  );
}

export default MovieCard;