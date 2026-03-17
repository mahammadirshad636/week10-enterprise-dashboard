import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { Input } from '@components/atoms/Input/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <Input
    placeholder="Search metrics"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      )
    }}
  />
);
