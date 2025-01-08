import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  private readonly omdbApiKey: string;

  constructor(private configService: ConfigService) {
    this.omdbApiKey = this.configService.get<string>('OMDB_API_KEY');
  }

  async searchMovies(query: string, page: number = 1): Promise<{ movies: Movie[]; totalResults: number }> {
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${this.omdbApiKey}&page=${page}`;
    const response = await axios.get(url);

    if (response.data.Response === 'False') {
      return { movies: [], totalResults: 0 };
    }

    const movies = response.data.Search;
    const totalResults = parseInt(response.data.totalResults, 10);
    return { movies, totalResults };
  }
}