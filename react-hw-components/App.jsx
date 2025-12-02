import Title from './Title.jsx';
import Button from './Button.jsx';
import Paragraph from './Paragraph.jsx';

function App() {
  return (
    <div>
      <Title>Заголовок</Title>
      <Button>Кнопка</Button>
      <Paragraph size="large">Текст параграфа</Paragraph>
      <Paragraph size="small">Маленький текст</Paragraph>
    </div>
  );
}