import React from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onAddFavorite?: () => void;
  isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddFavorite, isFavorite }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={movie.poster} 
        alt={movie.title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{movie.title}</h3> 
        <p className="text-gray-600">{movie.year}</p> 
        {onAddFavorite && (
          <button
            onClick={onAddFavorite}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;