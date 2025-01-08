import React from 'react';
import { toast } from 'react-toastify';
import { Movie } from '../types/movie';
import { addFavorite, deleteFavorite } from '../services/api';

interface FavoriteActionsProps {
  movie: Movie;
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const FavoriteActions: React.FC<FavoriteActionsProps> = ({ movie, favorites, setFavorites }) => {
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleAddFavorite = async () => {
    try {
      await addFavorite(movie);
      setFavorites([...favorites, movie]);
      toast.success(`Added ${movie.Title} to favorites`);
    } catch (err) {
      toast.error('Failed to add to favorites');
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      await deleteFavorite(movie.imdbID);
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
      toast.success('Movie deleted from favorites');
    } catch (err) {
      toast.error('Failed to delete favorite');
    }
  };

  return (
    <>
      {!isFavorite && (
        <button onClick={handleAddFavorite} className="bg-blue-500 hover:bg-blue-700 text-white p-3">
          Add to Favorites
        </button>
      )}
      {isFavorite && (
        <button onClick={handleDeleteFavorite} className="bg-red-500 hover:bg-red-700 text-white p-3">
          Remove from Favorites
        </button>
      )}
    </>
  );
};

export default FavoriteActions;