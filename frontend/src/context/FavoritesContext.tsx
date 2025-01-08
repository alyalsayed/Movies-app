import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites } from '../services/api';
import { Movie } from '../types/movie';

interface FavoritesContextType {
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavorites();
        setFavorites(result.data || []);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};