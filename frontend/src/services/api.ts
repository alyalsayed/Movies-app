import axios from 'axios';
import { Movie } from '../types/movie';

const apiUrl = import.meta.env.VITE_API_URL;

export const searchMovies = async (query: string, page: number = 1): Promise<{ movies: Movie[]; totalResults: number }> => {
  try {
    const response = await axios.get(`${apiUrl}/movies/search`, {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

export const getFavorites = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${apiUrl}/favorites`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch favorites');
  }
};

export const addFavorite = async (movie: Movie): Promise<Movie> => {
  try {
    const response = await axios.post(`${apiUrl}/favorites`, movie);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add favorite');
  }
};

export const deleteFavorite = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/favorites/${id}`);
  } catch (error) {
    throw new Error('Failed to delete favorite');
  }
};