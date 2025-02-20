import { Test, TestingModule } from '@nestjs/testing';
import { ValidationService } from './validation.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WordDocument } from './schemas/word.schema';

describe('ValidationService', () => {
  let service: ValidationService;
  let wordTRModel: Model<WordDocument>;
  let wordENModel: Model<WordDocument>;

  const mockWordModel = {
    findOne: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidationService,
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

    service = module.get<ValidationService>(ValidationService);
    wordTRModel = module.get<Model<WordDocument>>(getModelToken('WordTR'));
    wordENModel = module.get<Model<WordDocument>>(getModelToken('WordEN'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isValidWord', () => {
    it('should return true for valid Turkish word', async () => {
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ item: 'elma' }),
      } as any);

      const result = await service.isValidWord('elma', 'TR');
      expect(result).toBe(true);
      expect(wordTRModel.findOne).toHaveBeenCalledWith({
        item: { $regex: new RegExp('^elma$', 'i') },
      });
    });

    it('should return true for valid English word', async () => {
      jest.spyOn(wordENModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ item: 'apple' }),
      } as any);

      const result = await service.isValidWord('apple', 'EN');
      expect(result).toBe(true);
      expect(wordENModel.findOne).toHaveBeenCalledWith({
        item: { $regex: new RegExp('^apple$', 'i') },
      });
    });

    it('should return false for invalid Turkish word', async () => {
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.isValidWord('xyz123', 'TR');
      expect(result).toBe(false);
    });

    it('should return false for invalid English word', async () => {
      jest.spyOn(wordENModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.isValidWord('xyz123', 'EN');
      expect(result).toBe(false);
    });

    it('should handle case-insensitive search', async () => {
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ item: 'ELMA' }),
      } as any);

      const result = await service.isValidWord('elma', 'TR');
      expect(result).toBe(true);
      expect(wordTRModel.findOne).toHaveBeenCalledWith({
        item: { $regex: new RegExp('^elma$', 'i') },
      });
    });

    it('should handle database errors gracefully', async () => {
      jest.spyOn(wordTRModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      } as any);

      const result = await service.isValidWord('elma', 'TR');
      expect(result).toBe(false);
    });
  });
});
