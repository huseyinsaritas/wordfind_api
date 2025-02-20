import { Test, TestingModule } from '@nestjs/testing';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ValidationController', () => {
  let controller: ValidationController;
  let service: ValidationService;

  const mockValidationService = {
    isValidWord: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationController],
      providers: [
        {
          provide: ValidationService,
          useValue: mockValidationService,
        },
      ],
    }).compile();

    controller = module.get<ValidationController>(ValidationController);
    service = module.get<ValidationService>(ValidationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTr', () => {
    it('should return validation result for Turkish word', async () => {
      jest.spyOn(service, 'isValidWord').mockResolvedValue(true);

      const result = await controller.getTr('elma');
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: true,
      });
      expect(service.isValidWord).toHaveBeenCalledWith('elma', 'TR');
    });

    it('should handle service errors', async () => {
      jest.spyOn(service, 'isValidWord').mockRejectedValue(new Error());

      await expect(controller.getTr('elma')).rejects.toThrow(HttpException);
      await expect(controller.getTr('elma')).rejects.toThrow(
        expect.objectContaining({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          response: {
            success: false,
            message: 'Internal server error',
            data: null,
          },
        }),
      );
    });
  });

  describe('get', () => {
    it('should return validation result for specified language', async () => {
      jest.spyOn(service, 'isValidWord').mockResolvedValue(true);

      const result = await controller.get('apple', 'EN');
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: true,
      });
      expect(service.isValidWord).toHaveBeenCalledWith('apple', 'EN');
    });

    it('should handle invalid language parameter', async () => {
      await expect(controller.get('word', 'FR')).rejects.toThrow(HttpException);
      await expect(controller.get('word', 'FR')).rejects.toThrow(
        expect.objectContaining({
          status: HttpStatus.BAD_REQUEST,
          response: {
            success: false,
            message: 'Invalid language parameter. Use TR or EN.',
            data: null,
          },
        }),
      );
    });

    it('should handle service errors', async () => {
      jest.spyOn(service, 'isValidWord').mockRejectedValue(new Error());

      await expect(controller.get('word', 'EN')).rejects.toThrow(HttpException);
      await expect(controller.get('word', 'EN')).rejects.toThrow(
        expect.objectContaining({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          response: {
            success: false,
            message: 'Internal server error',
            data: null,
          },
        }),
      );
    });
  });
});
