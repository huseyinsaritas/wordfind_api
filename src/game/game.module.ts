import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { WordSchema } from './schemas/word.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WordTR', schema: WordSchema, collection: 'words_tr' },
      { name: 'WordEN', schema: WordSchema, collection: 'words_en' },
    ]),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
