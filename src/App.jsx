import Layout from './components/Layout/Layout.jsx';
import Title from './components/Title/Title.jsx';
import Paragraph from './components/Paragraph/Paragraph.jsx';
import Search from './components/Search/Search.jsx';
import MoviesList from './components/MovieList/MovieCard.jsx';

function App() {
  const handleSearch = (query) => {
    console.log('Ищем фильм:', query);
  };

  return (
    <Layout>
      <section className="page">
        <Title>Поиск</Title>
        <Paragraph size="medium">
          Введите название фильма, сериала или мультфильма для поиска и добавления в избранное.
        </Paragraph>
        <Search onSearch={handleSearch} />
        <MoviesList />
      </section>
    </Layout>
  );
}

export default App;
