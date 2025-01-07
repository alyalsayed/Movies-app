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

  async searchMovies(query: string): Promise<Movie[]> {
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${this.omdbApiKey}`;
    const response = await axios.get(url);

    if (response.data.Response === 'False') {
      return [];
    }

    return response.data.Search;
  }
}