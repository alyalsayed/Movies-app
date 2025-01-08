import React from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onAddFavorite?: () => void;
  onDelete?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddFavorite, onDelete }) => {
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
          {onAddFavorite && (
            <button
              onClick={onAddFavorite}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Favorites
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;