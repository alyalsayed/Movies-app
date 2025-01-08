import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchMovieDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10)) 
  page: number = 1; 
}