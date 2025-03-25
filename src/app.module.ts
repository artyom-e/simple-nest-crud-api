import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';
import app from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [app, database]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
