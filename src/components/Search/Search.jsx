// Search.jsx
import { useState } from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';

function Search({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(value);
  };

  return (
    <div className="search">
      <Input
        placeholder="Введите название"
        icon="🔍"
        value={value}
        onChange={handleChange}
      />
      <Button onClick={handleSearchClick}>Искать</Button>
    </div>
  );
}

export default Search;