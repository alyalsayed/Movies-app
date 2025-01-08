import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { searchMovies, addFavorite, deleteFavorite } from '../services/api';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useFavorites } from '../context/FavoritesContext';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const { favorites, setFavorites } = useFavorites();

  const handleSearch = async (page: number = 1) => {
    if (!query) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const { movies, totalResults } = await searchMovies(query, page);
      setResults(movies);
      setTotalResults(totalResults);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to search movies');
      toast.error('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (movie: Movie) => {
    try {
      await addFavorite(movie);
      setFavorites([...favorites, movie]); 
      toast.success(`Added ${movie.Title} to favorites`);
    } catch (err) {
      toast.error('Failed to add to favorites');
    }
  };

  const handleDeleteFavorite = async (imdbID: string) => {
    try {
      await deleteFavorite(imdbID); 
      setFavorites(favorites.filter((movie) => movie.imdbID !== imdbID)); // Update favorites list
      toast.success('Favorite deleted successfully');
    } catch (err) {
      toast.error('Failed to delete favorite');
    }
  };

  const isMovieInFavorites = (imdbID: string) => {
    return favorites.some((fav) => fav.imdbID === imdbID); 
  };

  useEffect(() => {
    if (results.length > 0) {
      const updatedResults = results.map((movie) => ({
        ...movie,
        isFavorite: isMovieInFavorites(movie.imdbID), 
      }));
      setResults(updatedResults);
    }
  }, [favorites]); 

  const totalPages = Math.ceil(totalResults / 10); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Movies</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={() => handleSearch(1)} />
      {loading && <div className="text-center mt-8">Loading...</div>}
      {error && <div className="text-center mt-8 text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {results.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddFavorite={!isMovieInFavorites(movie.imdbID) ? () => handleAddFavorite(movie) : undefined}
            onDelete={isMovieInFavorites(movie.imdbID) ? () => handleDeleteFavorite(movie.imdbID) : undefined}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalResults > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleSearch(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="mx-4 self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handleSearch(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;