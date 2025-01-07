import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
