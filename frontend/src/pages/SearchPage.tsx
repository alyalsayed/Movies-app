import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { searchMovies, addFavorite, getFavorites } from '../services/api';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        // Ensure data is always an array
        setFavorites(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error('Failed to fetch favorites. Please try again.');
      }
    };
    fetchFavorites();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.log(error);
      toast.error('Failed to search for movies. Please try again.');
    }
  };

  const handleAddFavorite = async (movie: Movie) => {
    try {
      await addFavorite({
        title: movie.title, 
        year: movie.year, 
        poster: movie.poster, 
        imdbID: movie.imdbID, 
      });
      toast.success(`${movie.title} added to favorites!`); 
      const updatedFavorites = await getFavorites();
      setFavorites(Array.isArray(updatedFavorites) ? updatedFavorites : []);
    } catch (error) {
      console.log(error);
      toast.error('Failed to add movie to favorites. Please try again.');
    }
  };

  const isFavorite = (movieId: string) => {
    return favorites.some((fav) => fav.imdbID === movieId);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline mb-4">Search Movies</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddFavorite={() => handleAddFavorite(movie)}
            isFavorite={isFavorite(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;