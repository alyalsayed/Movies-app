import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Movie } from '../types/movie';
import { addFavorite, deleteFavorite } from '../services/api';

const useFavorite = (favorites: Movie[], setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>) => {
  const isFavorite = useCallback(
    (movie: Movie) => favorites.some((fav) => fav.imdbID === movie.imdbID),
    [favorites]
  );

  const addToFavorites = async (movie: Movie) => {
    try {
      await addFavorite(movie);
      setFavorites((prev) => [...prev, movie]);
      toast.success(`Added ${movie.Title} to favorites`);
    } catch (err) {
      toast.error('Failed to add to favorites');
    }
  };

  const removeFromFavorites = async (imdbID: string) => {
    try {
      await deleteFavorite(imdbID);
      setFavorites((prev) => prev.filter((fav) => fav.imdbID !== imdbID));
      toast.success('Movie deleted from favorites');
    } catch (err) {
      toast.error('Failed to delete favorite');
    }
  };

  return { isFavorite, addToFavorites, removeFromFavorites };
};

export default useFavorite;
