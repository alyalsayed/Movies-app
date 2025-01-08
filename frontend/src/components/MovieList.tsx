import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';

interface MovieListProps {
  movies: Movie[];
  favorites: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MovieList: React.FC<MovieListProps> = ({ movies, favorites, setFavorites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  );
};

export default MovieList;