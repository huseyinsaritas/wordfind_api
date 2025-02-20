import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameConfig, GameConfigDocument } from './schemas/game-config.schema';
import CreateGameConfigDto from './dto/createGameConfig.dto';
import UpdateGameConfigDto from './dto/updateGameConfig.dto';

@Injectable()
export class GameConfigService {
  constructor(
    @InjectModel('GameConfig')
    private gameConfigModel: Model<GameConfigDocument>,
  ) {}

  getGameConfig(): Promise<GameConfig | null> {
    return this.gameConfigModel.findOne().exec();
  }

  async createGameConfig(
    createGameConfigDto: CreateGameConfigDto,
  ): Promise<GameConfig> {
    // Önce mevcut config var mı kontrol et
    const existingConfig = await this.getGameConfig();
    if (existingConfig) {
      // Varsa güncelle
      return this.updateGameConfig(createGameConfigDto);
    }
    // Yoksa yeni oluştur
    const createdGameConfig = new this.gameConfigModel(createGameConfigDto);
    return createdGameConfig.save();
  }

  async updateGameConfig(
    updateGameConfigDto: UpdateGameConfigDto,
  ): Promise<GameConfig> {
    const updatedConfig = await this.gameConfigModel
      .findOneAndUpdate({}, updateGameConfigDto, {
        new: true,
        upsert: true, // Kayıt yoksa oluşturur
      })
      .exec();

    return updatedConfig;
  }

  async deleteGameConfig(): Promise<void> {
    await this.gameConfigModel.deleteOne({}).exec();
  }
}
