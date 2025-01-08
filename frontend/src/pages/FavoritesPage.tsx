import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteFavorite } from '../services/api';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage: React.FC = () => {
  const { favorites, setFavorites } = useFavorites();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false); // Favorites are already fetched by the context
  }, []);

  const handleDeleteFavorite = async (imdbID: string) => {
    try {
      await deleteFavorite(imdbID); 
      setFavorites(favorites.filter(movie => movie.imdbID !== imdbID)); 
      toast.success("Favorite deleted successfully");
    } catch (err) {
      console.error("Failed to delete favorite", err);
      toast.error("Failed to delete favorite");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDelete={() => handleDeleteFavorite(movie.imdbID)} // Pass imdbID to onDelete
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;