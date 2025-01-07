import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getFavorites, deleteFavorite } from '../services/api';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        const favoritesData = response.data || [];
        setFavorites(Array.isArray(favoritesData) ? favoritesData : []);
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch favorites. Please try again.');
      }
    };
    fetchFavorites();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteFavorite(id);
      setFavorites(favorites.filter((fav) => fav.imdbID !== id)); // Update the state
      toast.success('Movie removed from favorites!');
    } catch (error) {
      toast.error('Failed to delete movie from favorites. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline mb-4">Favorite Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((favorite) => (
          <MovieCard
            key={favorite.imdbID}
            movie={favorite}
            onAddFavorite={() => handleDelete(favorite.imdbID)}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;