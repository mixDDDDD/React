import { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';

function Search({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      // здесь можно показать ошибку или просто ничего не делать
      return;
    }

    onSearch(trimmed);
    setValue(''); // очистка поля после успешного поиска
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <Input
        placeholder="Введите название"
        icon="🔍"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch}>Искать</Button>
    </div>
  );
}

export default Search;