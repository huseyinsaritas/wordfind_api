import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const mockUser: User = {
    username: 'john_doe',
    deviceId: '123456789abcdef',
    gameCount: 5,
    updatedTime: 1700000000,
  };

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user by deviceId', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await service.getUser('123456789abcdef');
      expect(result).toEqual(mockUser);
      expect(model.findOne).toHaveBeenCalledWith({ deviceId: '123456789abcdef' });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.getUser('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('saveUser', () => {
    it('should create a new user if not exists', async () => {
      const newUser: User = {
        username: 'new_user',
        deviceId: 'new_device_id',
        gameCount: 0,
        updatedTime: 1700000000,
      };

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);
      jest.spyOn(model, 'create').mockResolvedValue(newUser as any);

      const result = await service.saveUser(newUser);
      expect(result).toEqual(newUser);
      expect(model.create).toHaveBeenCalledWith(newUser);
    });

    it('should update existing user if found', async () => {
      const existingUser = {
        ...mockUser,
        save: jest.fn().mockResolvedValue(mockUser),
      };

      const updateData: User = {
        ...mockUser,
        gameCount: 6,
        updatedTime: 1700000001,
      };

      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingUser),
      } as any);

      const result = await service.saveUser(updateData);
      expect(result).toEqual(mockUser);
      expect(existingUser.save).toHaveBeenCalled();
      expect(existingUser.gameCount).toBe(updateData.gameCount);
      expect(existingUser.updatedTime).toBe(updateData.updatedTime);
    });

    it('should return existing user if deviceId matches but no updates needed', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await service.saveUser(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});
