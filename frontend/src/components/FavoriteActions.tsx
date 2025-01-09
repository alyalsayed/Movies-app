import React from 'react';
import { Movie } from '../types/movie';
import useFavorite from '../hooks/useFavorite';

interface FavoriteActionsProps {
  movie: Movie;
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const FavoriteActions: React.FC<FavoriteActionsProps> = ({ movie, favorites, setFavorites }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorite(favorites, setFavorites);

  return (
    <>
      {!isFavorite(movie) ? (
        <button onClick={() => addToFavorites(movie)} className="bg-blue-500 hover:bg-blue-700 text-white p-3">
          Add to Favorites
        </button>
      ) : (
        <button onClick={() => removeFromFavorites(movie.imdbID)} className="bg-red-500 hover:bg-red-700 text-white p-3">
          Remove from Favorites
        </button>
      )}
    </>
  );
};

export default FavoriteActions;
