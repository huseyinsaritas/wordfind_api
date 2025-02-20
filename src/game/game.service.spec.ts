import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word, WordDocument } from './schemas/word.schema';

describe('GameService', () => {
  let service: GameService;
  let wordTRModel: Model<WordDocument>;
  let wordENModel: Model<WordDocument>;

  const mockWord: Word = {
    word: 'kitap',
    len: 5,
    id: 1,
  };

  const mockWordModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    deleteOne: jest.fn(),
    sort: jest.fn(),
    select: jest.fn(),
    lean: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getModelToken('WordTR'),
          useValue: mockWordModel,
        },
        {
          provide: getModelToken('WordEN'),
          useValue: mockWordModel,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
    wordTRModel = module.get<Model<WordDocument>>(getModelToken('WordTR'));
    wordENModel = module.get<Model<WordDocument>>(getModelToken('WordEN'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWordData', () => {
    it('should return a word for TR language', async () => {
      const mockExec = jest.fn().mockResolvedValue(mockWord);
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({ exec: mockExec } as any);

      const result = await service.getWordData(5, 'TR');
      expect(result).toEqual(mockWord);
      expect(wordTRModel.findOne).toHaveBeenCalledWith({ len: 5, id: expect.any(Number) });
    });

    it('should return a word for EN language', async () => {
      const mockExec = jest.fn().mockResolvedValue(mockWord);
      jest.spyOn(wordENModel, 'findOne').mockReturnValue({ exec: mockExec } as any);

      const result = await service.getWordData(5, 'EN');
      expect(result).toEqual(mockWord);
      expect(wordENModel.findOne).toHaveBeenCalledWith({ len: 5, id: expect.any(Number) });
    });

    it('should return null if no word is found', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({ exec: mockExec } as any);

      const result = await service.getWordData(5, 'TR');
      expect(result).toBeNull();
    });
  });

  describe('getMaxIdByLength', () => {
    it('should return max id for given length', async () => {
      const mockLastWord = { id: 10 };
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({
        sort: () => ({
          select: () => ({
            lean: () => Promise.resolve(mockLastWord),
          }),
        }),
      } as any);

      const result = await service.getMaxIdByLength(5, 'TR');
      expect(result).toBe(10);
    });

    it('should return 0 if no words found', async () => {
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({
        sort: () => ({
          select: () => ({
            lean: () => Promise.resolve(null),
          }),
        }),
      } as any);

      const result = await service.getMaxIdByLength(5, 'TR');
      expect(result).toBe(0);
    });
  });

  describe('insertWord', () => {
    it('should insert a new word successfully', async () => {
      const newWord = { word: 'kitap', len: 5, id: 1 };
      
      jest.spyOn(service, 'getMaxIdByLength').mockResolvedValue(0);
      const saveMock = jest.fn().mockResolvedValue(newWord);
      jest.spyOn(wordTRModel.prototype, 'save').mockImplementation(saveMock);

      const result = await service.insertWord('kitap', 5, 'TR');
      expect(result).toEqual(newWord);
    });

    it('should throw error on insertion failure', async () => {
      jest.spyOn(service, 'getMaxIdByLength').mockResolvedValue(0);
      jest.spyOn(wordTRModel.prototype, 'save').mockRejectedValue(new Error('DB Error'));

      await expect(service.insertWord('kitap', 5, 'TR')).rejects.toThrow('DB Error');
    });
  });

  describe('deleteWord', () => {
    it('should delete word successfully', async () => {
      const mockDeleteResult = { deletedCount: 1 };
      jest.spyOn(wordTRModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDeleteResult),
      } as any);

      const result = await service.deleteWord('kitap');
      expect(result).toBe(true);
      expect(wordTRModel.deleteOne).toHaveBeenCalledWith({ word: 'kitap' });
    });

    it('should return false when word not found', async () => {
      const mockDeleteResult = { deletedCount: 0 };
      jest.spyOn(wordTRModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDeleteResult),
      } as any);

      const result = await service.deleteWord('nonexistent');
      expect(result).toBe(false);
    });
  });

  describe('deleteWordById', () => {
    it('should delete word by id successfully', async () => {
      const mockDeleteResult = { deletedCount: 1 };
      jest.spyOn(wordTRModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDeleteResult),
      } as any);

      const result = await service.deleteWordById(1);
      expect(result).toBe(true);
      expect(wordTRModel.deleteOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return false when word id not found', async () => {
      const mockDeleteResult = { deletedCount: 0 };
      jest.spyOn(wordTRModel, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDeleteResult),
      } as any);

      const result = await service.deleteWordById(999);
      expect(result).toBe(false);
    });
  });
});
