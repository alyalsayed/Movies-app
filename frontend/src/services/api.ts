import axios from 'axios';
import { Movie } from '../types/movie';

const apiUrl = import.meta.env.VITE_API_URL;

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(`${apiUrl}/movies/search?query=${query}`);
  return response.data;
};

export const getFavorites = async (): Promise<Movie[]> => {
  const response = await axios.get(`${apiUrl}/favorites`);
  return response.data;
};

export const addFavorite = async (movie: {
  title: string;
  year: string;
  poster: string;
  imdbID: string;
}) => {
  const response = await axios.post(`${apiUrl}/favorites`, movie);
  return response.data;
};
export const updateFavorite = async (id: string, movie: Movie): Promise<Movie> => {
  const response = await axios.put(`${apiUrl}/favorites/${id}`, movie);
  return response.data;
};

export const deleteFavorite = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/favorites/${id}`);
};