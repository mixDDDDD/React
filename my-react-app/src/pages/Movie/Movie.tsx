import { useLoaderData } from 'react-router-dom';
import styles from './Movie.module.css';

type MovieLoaderData = {
  short: {
    name: string;
    image: string;
    description: string;
    genre: string[];
    datePublished: string;
    duration?: string;
    aggregateRating?: {
      ratingValue: number;
    };
  };
};

function formatDuration(duration?: string) {
  if (!duration) return null;

  const match = duration.match(/PT(\d+)M/);
  if (!match) return null;

  const minutes = Number(match[1]);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours} ч ${mins} мин`;
}


export default function Movie() {
  const data = useLoaderData() as MovieLoaderData;
  const movie = data.short;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <img
          src={movie.image}
          alt={movie.name}
          className={styles.poster}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.name}</h1>

          <p className={styles.meta}>
            {movie.datePublished}
            {movie.duration && ` · ${formatDuration(movie.duration)}`}
            {' · '}
            {movie.genre.join(', ')}
          </p>


          {movie.aggregateRating && (
            <p className={styles.rating}>
              ⭐ {movie.aggregateRating.ratingValue}
            </p>
          )}
        </div>
      </div>

      <div className={styles.description}>
        <h2>Описание</h2>
        <p>{movie.description}</p>
      </div>
    </section>
  );
}
