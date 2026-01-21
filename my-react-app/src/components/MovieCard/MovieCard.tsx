import styles from './MovieCard.module.css';
import { MovieModel } from '../../types/movie';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addFavorite,
  removeFavorite,
  getFavoritesKey,
} from '../../store/favoritesSlice';
import { useUser } from '../../context/UserContext';

type MovieCardProps = {
  movie: MovieModel;
};

function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );
  const { user } = useUser();

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  const handleToggleFavorite = () => {
    if (!user?.name) return;

    let updatedFavorites;

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
      updatedFavorites = favorites.filter(
        (item) => item.id !== movie.id
      );
    } else {
      dispatch(addFavorite(movie));
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem(
      getFavoritesKey(user.name),
      JSON.stringify(updatedFavorites)
    );
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
