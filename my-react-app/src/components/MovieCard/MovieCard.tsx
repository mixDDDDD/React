import styles from './MovieCard.module.css';
import { MovieModel } from '../../types/movie';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';

type MovieCardProps = {
  movie: MovieModel;
};

function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  const userName = useAppSelector(
    (state) => state.user.name
  );

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  const handleToggleFavorite = () => {
    if (!userName) return;

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={movie.image}
        alt={movie.title}
        className={styles.poster}
      />

      <button
        onClick={handleToggleFavorite}
        className={styles.favoriteBtn}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
}

export default MovieCard;
