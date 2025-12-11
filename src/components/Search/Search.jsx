import { useState } from 'react';
import Input from './Input.js';
import Button from './Button.js';

function Search({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    onSearch(trimmed);
    setValue('');
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