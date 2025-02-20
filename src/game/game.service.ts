import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word, WordDocument } from './schemas/word.schema';
import { maxId } from '../utils/maxId';
import { randomId } from '../utils/randomId';

@Injectable()
export class GameService {
  constructor(
    @InjectModel('WordTR') private wordTRModel: Model<WordDocument>,
    @InjectModel('WordEN') private wordENModel: Model<WordDocument>,
  ) {}

  async getWordData(len: number, language: 'TR' | 'EN'): Promise<Word | null> {
    const model = language === 'TR' ? this.wordTRModel : this.wordENModel;
    const maxNum = maxId(len);
    const id = randomId(maxNum);
    return model.findOne({ len, id }).exec();
  }

  // async insertWord(data: Partial<Word>[]): Promise<Word[]> {
  //   try {
  //     const result = await this.wordTRModel.insertMany(data, { lean: true });
  //     if (!result.length) {
  //       throw new Error('No data was inserted');
  //     }
  //     return result.map(({ _id, ...rest }) => rest) as Word[];
  //   } catch (err) {
  //     console.error('Error inserting data:', err);
  //     throw err;
  //   }
  // }

  async getMaxIdByLength(len: number, language: 'TR' | 'EN'): Promise<number> {
    const model = language === 'TR' ? this.wordTRModel : this.wordENModel;

    const lastWord: { id: number } | null = await model
      .findOne({ len })
      .sort({ id: -1 })
      .select('id')
      .lean();

    return lastWord ? lastWord.id : 0;
  }

  async insertWord(
    word: string,
    len: number,
    language: 'TR' | 'EN',
  ): Promise<Word> {
    try {
      const model = language === 'TR' ? this.wordTRModel : this.wordENModel;

      // O uzunluktaki en büyük id'yi al
      const maxId = await this.getMaxIdByLength(len, language);

      // Yeni kelimeyi oluştur
      const newWord = new model({ word, len, id: maxId + 1 });

      // Veritabanına kaydet
      await newWord.save();

      return { word: newWord.word, len: newWord.len, id: newWord.id as number };
    } catch (err) {
      console.error('Error inserting data:', err);
      throw err;
    }
  }

  async deleteWord(word: string): Promise<boolean> {
    try {
      const result = await this.wordTRModel.deleteOne({ word }).exec();
      return result.deletedCount > 0; // Returns true if a word was deleted
    } catch (err) {
      console.error('Error deleting word:', err);
      return false;
    }
  }

  async deleteWordById(id: number): Promise<boolean> {
    try {
      const result = await this.wordTRModel.deleteOne({ id }).exec();
      return result.deletedCount > 0; // Returns true if a word was deleted
    } catch (err) {
      console.error('Error deleting word with id:', id, err);
      return false;
    }
  }
}
