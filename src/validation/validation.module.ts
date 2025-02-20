import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';
import { WordSchema } from './schemas/word.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WordTR', schema: WordSchema, collection: 'words_tr' },
      { name: 'WordEN', schema: WordSchema, collection: 'words_en' },
    ]),
  ],
  controllers: [ValidationController],
  providers: [ValidationService],
})
export class ValidationModule {}
