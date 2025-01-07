import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchMovieDto } from './dto/search-movie.dto';
import { Movie } from './interfaces/movie.interface';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async search(@Query() searchMovieDto: SearchMovieDto): Promise<Movie[]> {
    return this.moviesService.searchMovies(searchMovieDto.query);
  }
}