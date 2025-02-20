import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';
import { ValidationModule } from './validation/validation.module';
import { UserModule } from './user/user.module';
import { GameConfigModule } from './game-config/game-config.module';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const uri = configService.getOrThrow<string>('database.uri');
        const dbName = configService.getOrThrow<string>('database.dbName');

        console.log('🔗 MongoDB Bağlantısı Başlatılıyor...');
        console.log(`📌 MongoDB URI: ${uri}`);
        console.log(`📌 Database Name: ${dbName}`);

        return {
          uri,
          dbName,
          bufferCommands: false,
        };
      },
      inject: [ConfigService],
    }),
    GameModule,
    ValidationModule,
    UserModule,
    GameConfigModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
