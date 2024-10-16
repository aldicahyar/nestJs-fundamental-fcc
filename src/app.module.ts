import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/entity/song.entity';
import { Artist } from './artists/entity/artist.entity';
import { User } from './users/entity/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    SongsModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify-clone',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      entities: [Song, Artist, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
    AuthService,
  ],
})
export class AppModule implements NestModule {
  // Jangan inject DataSource di sini jika tidak diperlukan
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'songs',
      method: RequestMethod.ALL,
    });
  }
}
