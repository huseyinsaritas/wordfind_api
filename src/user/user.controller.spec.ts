import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser: User = {
    username: 'john_doe',
    deviceId: '123456789abcdef',
    gameCount: 5,
    updatedTime: 1700000000,
  };

  const mockUserService = {
    getUser: jest.fn(),
    saveUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return user data', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue(mockUser);

      const result = await controller.get('123456789abcdef');
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: mockUser,
      });
      expect(service.getUser).toHaveBeenCalledWith('123456789abcdef');
    });

    it('should return null when user not found', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue(null);

      const result = await controller.get('nonexistent');
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: null,
      });
    });
  });

  describe('post', () => {
    it('should create a new user', async () => {
      const newUser: User = {
        username: 'new_user',
        deviceId: 'new_device_id',
        gameCount: 0,
        updatedTime: 1700000000,
      };

      jest.spyOn(service, 'saveUser').mockResolvedValue(mockUser);

      const result = await controller.post(newUser);
      expect(result).toEqual({
        success: true,
        message: 'success',
        data: mockUser,
      });
      expect(service.saveUser).toHaveBeenCalledWith(newUser);
    });
  });
});
