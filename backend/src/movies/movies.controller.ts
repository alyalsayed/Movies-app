import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMovieDto } from './dto/search-movie.dto';
import { Movie } from './interfaces/movie.interface';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchMovies(@Query() searchMovieDto: SearchMovieDto): Promise<{ movies: Movie[]; totalResults: number }> {
    return this.moviesService.searchMovies(searchMovieDto.query, searchMovieDto.page);
  }
}