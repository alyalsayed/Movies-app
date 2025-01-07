import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateFavoriteDto } from './dto/create-favorite.dto';
  import { UpdateFavoriteDto } from './dto/update-favorite.dto';
  import { Prisma } from '@prisma/client';
  
  @Injectable()
  export class FavoritesService {
    constructor(private prisma: PrismaService) {}
  
    async create(createFavoriteDto: CreateFavoriteDto) {
      try {
        const existingFavorite = await this.prisma.favoriteMovie.findUnique({
          where: { imdbID: createFavoriteDto.imdbID },
        });
  
        if (existingFavorite) {
          throw new ConflictException({
            statusCode: 409,
            message: `Movie with IMDb ID ${createFavoriteDto.imdbID} already exists in favorites.`,
          });
        }
  
        const favorite = await this.prisma.favoriteMovie.create({
          data: createFavoriteDto,
        });
  
        return {
          statusCode: 201,
          message: 'Favorite movie added successfully.',
          data: favorite,
        };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException({
              statusCode: 409,
              message: `A favorite movie with the same IMDb ID already exists.`,
            });
          }
        }
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'Failed to create favorite movie. Please try again later.',
        });
      }
    }
  
    async findAll() {
      try {
        const favorites = await this.prisma.favoriteMovie.findMany();
        if (favorites.length === 0) {
          throw new NotFoundException({
            statusCode: 404,
            message: 'No favorite movies found.',
          });
        }
  
        return {
          statusCode: 200,
          message: 'Favorite movies fetched successfully.',
          data: favorites,
        };
      } catch (error) {
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'Failed to fetch favorite movies. Please try again later.',
        });
      }
    }
  
    async findOne(id: string) {
      try {
        const favorite = await this.prisma.favoriteMovie.findUnique({
          where: { id },
        });
        if (!favorite) {
          throw new NotFoundException({
            statusCode: 404,
            message: `Favorite movie with ID ${id} not found.`,
          });
        }
  
        return {
          statusCode: 200,
          message: 'Favorite movie fetched successfully.',
          data: favorite,
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'Failed to fetch favorite movie. Please try again later.',
        });
      }
    }
  
    async update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
        try {
          const updatedFavorite = await this.prisma.favoriteMovie.update({
            where: { id },
            data: updateFavoriteDto,
          });
      
          return {
            statusCode: 200,
            message: 'Favorite movie updated successfully.',
            data: updatedFavorite,
          };
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
              throw new NotFoundException({
                statusCode: 404,
                message: `Favorite movie with ID ${id} not found.`,
              });
            }
            if (error.code === 'P2002') {
              throw new ConflictException({
                statusCode: 409,
                message: `A favorite movie with the same IMDb ID already exists.`,
              });
            }
          }
          throw new InternalServerErrorException({
            statusCode: 500,
            message: 'Failed to update favorite movie. Please try again later.',
          });
        }
      }
    async remove(id: string) {
      try {
        const existingFavorite = await this.prisma.favoriteMovie.findUnique({
          where: { id },
        });
        if (!existingFavorite) {
          throw new NotFoundException({
            statusCode: 404,
            message: `Favorite movie with ID ${id} not found.`,
          });
        }
  
        await this.prisma.favoriteMovie.delete({ where: { id } });
  
        return {
          statusCode: 200,
          message: 'Favorite movie deleted successfully.',
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'Failed to delete favorite movie. Please try again later.',
        });
      }
    }
  }