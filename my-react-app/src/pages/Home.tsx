import { useState } from 'react';
import Title from '../components/Title/Title';
import Paragraph from '../components/Paragraph/Paragraph';
import Search from '../components/Search/Search';
import MovieList from '../components/MovieList/MovieList';
import { movieImages } from '../data/moviesImages';
import { MovieModel } from '../types/movie';

export default function Home() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://search.imdbot.workers.dev/?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();

      if (data?.results?.length) {
        const searchMovies: MovieModel[] = data.results.map((item: any) => ({
          id: item.id,
          title: item.title ?? 'Без названия',
          image: item.image ?? '/images/placeholder.png',
        }));

        setMovies(searchMovies);
      } else {
        setMovies([]);
        setError('Фильмы не найдены');
      }
    } catch (e) {
      setMovies([]);
      setError('Ошибка сети. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <Title>Поиск</Title>

      <Paragraph size="medium">
        Введите название фильма, сериала или мультфильма для поиска.
      </Paragraph>

      <Search onSearch={handleSearch} />

      {loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '18px',
            color: '#666',
          }}
        >
          🔄 Загрузка результатов...
        </div>
      )}

      {error && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: '#e74c3c',
            fontSize: '18px',
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999',
            fontSize: '16px',
          }}
        >
          Начните поиск фильма!
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </section>
  );
}