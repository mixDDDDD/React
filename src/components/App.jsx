import Layout from './Layout.jsx';
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';
import Search from './Search.jsx';

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
      </section>
    </Layout>
  );
}

export default App;
