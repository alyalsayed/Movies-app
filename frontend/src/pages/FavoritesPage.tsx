import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage: React.FC = () => {
  const { favorites, setFavorites } = useFavorites();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <EmptyState message="No favorites found. Start adding some movies to your favorites!" />
      ) : (
        <MovieList movies={favorites} favorites={favorites} setFavorites={setFavorites} />
      )}
    </div>
  );
};

export default FavoritesPage;