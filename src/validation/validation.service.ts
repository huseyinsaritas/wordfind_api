import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WordDocument } from './schemas/word.schema';

@Injectable()
export class ValidationService {
  constructor(
    @InjectModel('WordTR') private wordTRModel: Model<WordDocument>,
    @InjectModel('WordEN') private wordENModel: Model<WordDocument>,
  ) {}

  async isValidWord(item: string, language: 'TR' | 'EN'): Promise<boolean> {
    try {
      const model = language === 'TR' ? this.wordTRModel : this.wordENModel;
      const word = await model
        .findOne({
          item: { $regex: new RegExp(`^${item}$`, 'i') },
        })
        .exec();
      return word !== null;
    } catch (error) {
      console.error('Error validating word:', error);
      return false;
    }
  }
}
