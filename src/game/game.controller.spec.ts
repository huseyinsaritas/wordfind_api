import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { BadRequestException } from '@nestjs/common';
import { Word } from './schemas/word.schema';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  const mockWord: Word = {
    word: 'kitap',
    len: 5,
    id: 1,
  };

  const mockGameService = {
    getWordData: jest.fn(),
    insertWord: jest.fn(),
    deleteWord: jest.fn(),
    deleteWordById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: mockGameService,
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTr', () => {
    it('should return word data for TR language', async () => {
      jest.spyOn(service, 'getWordData').mockResolvedValue(mockWord);

      const result = await controller.getTr(5);
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: mockWord,
      });
      expect(service.getWordData).toHaveBeenCalledWith(5, 'TR');
    });

    it('should handle null response from service', async () => {
      jest.spyOn(service, 'getWordData').mockResolvedValue(null);

      const result = await controller.getTr(5);
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: null,
      });
    });
  });

  describe('get', () => {
    it('should return word data for TR language when language is not EN', async () => {
      jest.spyOn(service, 'getWordData').mockResolvedValue(mockWord);

      const result = await controller.get(5, 'TR');
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: mockWord,
      });
      expect(service.getWordData).toHaveBeenCalledWith(5, 'TR');
    });

    it('should return word data for EN language', async () => {
      jest.spyOn(service, 'getWordData').mockResolvedValue(mockWord);

      const result = await controller.get(5, 'EN');
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: mockWord,
      });
      expect(service.getWordData).toHaveBeenCalledWith(5, 'EN');
    });
  });

  describe('insert', () => {
    it('should insert a valid word successfully', async () => {
      const newWord = { word: 'kitap', len: 5, id: 1 };
      jest.spyOn(service, 'insertWord').mockResolvedValue(newWord);

      const result = await controller.insert({ word: 'kitap' }, 'TR');
      expect(result).toEqual({
        success: true,
        message: 'Word inserted successfully',
        data: newWord,
      });
      expect(service.insertWord).toHaveBeenCalledWith('kitap', 5, 'TR');
    });

    it('should throw BadRequestException for empty word', async () => {
      await expect(controller.insert({ word: '' }, 'TR')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for invalid word length', async () => {
      await expect(controller.insert({ word: 'test' }, 'TR')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should use TR as default language when language is not EN', async () => {
      const newWord = { word: 'kitap', len: 5, id: 1 };
      jest.spyOn(service, 'insertWord').mockResolvedValue(newWord);

      await controller.insert({ word: 'kitap' }, 'invalid');
      expect(service.insertWord).toHaveBeenCalledWith('kitap', 5, 'TR');
    });
  });

  describe('deleteWord', () => {
    it('should delete word successfully', async () => {
      jest.spyOn(service, 'deleteWord').mockResolvedValue(true);

      const result = await controller.deleteWord('kitap');
      expect(result).toEqual({
        success: true,
        message: 'Word deleted successfully',
      });
      expect(service.deleteWord).toHaveBeenCalledWith('kitap');
    });

    it('should return not found when word does not exist', async () => {
      jest.spyOn(service, 'deleteWord').mockResolvedValue(false);

      const result = await controller.deleteWord('nonexistent');
      expect(result).toEqual({
        success: false,
        message: 'Word not found',
        data: null,
      });
    });
  });

  describe('deleteWordById', () => {
    it('should delete word by id successfully', async () => {
      jest.spyOn(service, 'deleteWordById').mockResolvedValue(true);

      const result = await controller.deleteWordById(1);
      expect(result).toEqual({
        success: true,
        message: 'Word deleted successfully',
      });
      expect(service.deleteWordById).toHaveBeenCalledWith(1);
    });

    it('should return not found when word id does not exist', async () => {
      jest.spyOn(service, 'deleteWordById').mockResolvedValue(false);

      const result = await controller.deleteWordById(999);
      expect(result).toEqual({
        success: false,
        message: 'Word not found',
        data: null,
      });
    });
  });
});
