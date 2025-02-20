import { Test, TestingModule } from '@nestjs/testing';
import { GameConfigController } from './game-config.controller';
import { GameConfigService } from './game-config.service';
import { GameConfig } from './schemas/game-config.schema';
import CreateGameConfigDto from './dto/createGameConfig.dto';
import UpdateGameConfigDto from './dto/updateGameConfig.dto';

describe('GameConfigController', () => {
  let controller: GameConfigController;
  let service: GameConfigService;

  const mockGameConfig: GameConfig = {
    version: '1.0.0',
    adsCycle: 3,
  };

  const mockGameConfigService = {
    getGameConfig: jest.fn(),
    createGameConfig: jest.fn(),
    updateGameConfig: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameConfigController],
      providers: [
        {
          provide: GameConfigService,
          useValue: mockGameConfigService,
        },
      ],
    }).compile();

    controller = module.get<GameConfigController>(GameConfigController);
    service = module.get<GameConfigService>(GameConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return game config', async () => {
      jest.spyOn(service, 'getGameConfig').mockResolvedValue(mockGameConfig);

      const result = await controller.get();
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: mockGameConfig,
      });
      expect(service.getGameConfig).toHaveBeenCalled();
    });

    it('should return empty object when no config exists', async () => {
      jest.spyOn(service, 'getGameConfig').mockResolvedValue(null);

      const result = await controller.get();
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: {},
      });
    });
  });

  describe('createGameConfig', () => {
    it('should create a new game config', async () => {
      const config: CreateGameConfigDto = {
        version: '1.0.0',
        adsCycle: 3,
      };

      jest.spyOn(service, 'createGameConfig').mockResolvedValue(mockGameConfig);

      const result = await controller.createGameConfig(config);
      expect(result).toEqual(mockGameConfig);
      expect(service.createGameConfig).toHaveBeenCalledWith(config);
    });
  });

  describe('updateGameConfig', () => {
    it('should update game config', async () => {
      const config: UpdateGameConfigDto = {
        version: '1.0.0',
        adsCycle: 5,
      };

      jest.spyOn(service, 'updateGameConfig').mockResolvedValue(mockGameConfig);

      const result = await controller.updateGameConfig(config);
      expect(result).toEqual(mockGameConfig);
      expect(service.updateGameConfig).toHaveBeenCalledWith(config);
    });
  });
});
