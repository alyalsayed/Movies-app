import React from 'react';
import useSearch from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import MovieList from '../components/MovieList';
import { useFavorites } from '../context/FavoritesContext';
import { calculateTotalPages } from '../utils/search';

const SearchPage: React.FC = () => {
  const {
    query,
    setQuery,
    currentPage,
    searchResults,
    isLoading,
    isError,
    handleSearch,
  } = useSearch();
  const { favorites, setFavorites } = useFavorites();

  const totalPages = calculateTotalPages(searchResults?.totalResults || 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={() => handleSearch(1)} />
      {isLoading && <Spinner />}
      {isError && <div className="text-center mt-8 text-red-500">Failed to search movies</div>}
      {searchResults?.movies.length === 0 ? (
        <EmptyState message="No movies found. Try a different search!" />
      ) : (
        <MovieList movies={searchResults?.movies || []} favorites={favorites} setFavorites={setFavorites} />
      )}
      {(searchResults?.totalResults || 0) > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleSearch} />
      )}
    </div>
  );
};

export default SearchPage;