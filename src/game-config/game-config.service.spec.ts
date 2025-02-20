import { Test, TestingModule } from '@nestjs/testing';
import { GameConfigService } from './game-config.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameConfig } from './schemas/game-config.schema';
import UpdateGameConfigDto from './dto/updateGameConfig.dto';
import CreateGameConfigDto from './dto/createGameConfig.dto';

describe('GameConfigService', () => {
  let service: GameConfigService;
  let model: Model<GameConfig>;

  const mockGameConfig: GameConfig = {
    version: '1.0.0',
    adsCycle: 3,
  };

  const mockGameConfigModel = {
    findOne: jest.fn(),
    save: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameConfigService,
        {
          provide: getModelToken('GameConfig'),
          useValue: mockGameConfigModel,
        },
      ],
    }).compile();

    service = module.get<GameConfigService>(GameConfigService);
    model = module.get<Model<GameConfig>>(getModelToken('GameConfig'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGameConfig', () => {
    it('should return game config', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGameConfig),
      } as any);

      const result = await service.getGameConfig();
      expect(result).toEqual(mockGameConfig);
      expect(model.findOne).toHaveBeenCalled();
    });

    it('should return null if no config exists', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.getGameConfig();
      expect(result).toBeNull();
    });
  });

  describe('createGameConfig', () => {
    it('should create a new game config when none exists', async () => {
      const createGameConfigDto: CreateGameConfigDto = {
        version: '1.0.0',
        adsCycle: 3,
      };

      jest.spyOn(service, 'getGameConfig').mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue(mockGameConfig);
      jest.spyOn(model.prototype, 'save').mockImplementation(saveMock);

      const result = await service.createGameConfig(createGameConfigDto);
      expect(result).toEqual(mockGameConfig);
    });

    it('should update existing config when one exists', async () => {
      const createGameConfigDto: CreateGameConfigDto = {
        version: '1.0.0',
        adsCycle: 3,
      };

      jest.spyOn(service, 'getGameConfig').mockResolvedValue(mockGameConfig);
      jest.spyOn(service, 'updateGameConfig').mockResolvedValue(mockGameConfig);

      const result = await service.createGameConfig(createGameConfigDto);
      expect(result).toEqual(mockGameConfig);
      expect(service.updateGameConfig).toHaveBeenCalledWith(createGameConfigDto);
    });
  });

  describe('updateGameConfig', () => {
    it('should update game config', async () => {
      const updateGameConfigDto: UpdateGameConfigDto = {
        version: '1.0.0',
        adsCycle: 5,
      };

      jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGameConfig),
      } as any);

      const result = await service.updateGameConfig(updateGameConfigDto);
      expect(result).toEqual(mockGameConfig);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        {},
        updateGameConfigDto,
        {
          new: true,
          upsert: true,
        },
      );
    });
  });

  describe('deleteGameConfig', () => {
    it('should delete game config', async () => {
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      } as any);

      await service.deleteGameConfig();
      expect(model.deleteOne).toHaveBeenCalledWith({});
    });
  });
});
