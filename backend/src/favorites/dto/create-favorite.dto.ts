import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsString()
  @IsNotEmpty()
  Year: string;

  @IsString()
  @IsNotEmpty()
  Poster: string;

  @IsString()
  @IsNotEmpty()
  imdbID: string;
}