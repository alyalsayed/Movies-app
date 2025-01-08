import React from 'react';
import { Movie } from '../types/movie';
import FavoriteActions from './FavoriteActions';

interface MovieCardProps {
  movie: Movie;
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, favorites, setFavorites }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{movie.Title}</h3>
        <p className="text-gray-600">{movie.Year}</p>
        <div className="mt-2 space-x-2">
          <FavoriteActions movie={movie} favorites={favorites} setFavorites={setFavorites} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;