import styles from './MovieCard.module.css';

type MovieCardProps = {
  src: string
  alt: string
}

function MovieCard({ src, alt }: MovieCardProps) {
  return (
    <img className={styles['movies-list__poster']} src={src} alt={alt} />
  );
}

export default MovieCard;