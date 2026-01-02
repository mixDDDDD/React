import { useState } from 'react';
import Input from '../Input/Input.js';
import Button from '../Button/Button.js';
import styles from './Search.module.css';

type SearchProps = {
  onSearch: (query: string) => void
}

function Search({ onSearch }: SearchProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
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