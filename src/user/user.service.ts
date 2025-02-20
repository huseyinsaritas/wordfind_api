import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getUser(deviceId: string): Promise<User | null> {
    return await this.userModel.findOne({ deviceId }).exec();
  }

  async saveUser(newUser: User): Promise<User> {
    const user = (await this.userModel
      .findOne({
        deviceId: newUser.deviceId,
        username: newUser.username,
      })
      .exec()) as UserDocument;

    if (!user) {
      return this.userModel.create(newUser);
    }

    if (user.deviceId === newUser.deviceId) {
      user.gameCount = newUser.gameCount;
      user.updatedTime = newUser.updatedTime;
      return user.save();
    }

    return user;
  }
}
