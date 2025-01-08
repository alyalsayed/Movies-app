import React from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="flex-grow p-2 border border-gray-300 rounded-l"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white p-2 rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;