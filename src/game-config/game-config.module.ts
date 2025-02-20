import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameConfigController } from './game-config.controller';
import { GameConfigService } from './game-config.service';
import { GameConfigSchema } from './schemas/game-config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GameConfig', schema: GameConfigSchema },
    ]),
  ],
  controllers: [GameConfigController],
  providers: [GameConfigService],
})
export class GameConfigModule {}
