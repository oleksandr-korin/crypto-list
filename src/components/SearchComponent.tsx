import React from 'react';
import { TextField } from '@mui/material';

interface SearchComponentProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  style?: React.CSSProperties;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      style={{ width: '30%' }}
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchComponent;
