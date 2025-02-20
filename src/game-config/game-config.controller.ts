import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameConfig } from './schemas/game-config.schema';
import { GameConfigService } from './game-config.service';

@ApiTags('Game Configuration')
@Controller('conf')
export class GameConfigController {
  constructor(private readonly gameConfigService: GameConfigService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved game config',
  })
  async get() {
    const config = await this.gameConfigService.getGameConfig();
    return {
      success: true,
      message: 'success',
      data: config || {},
    };
  }

  @Post()
  @ApiBody({ type: GameConfig })
  @ApiResponse({ status: 201, description: 'Game config created successfully' })
  async createGameConfig(@Body() config: GameConfig) {
    return this.gameConfigService.createGameConfig(config);
  }

  @Put()
  @ApiBody({ type: GameConfig })
  @ApiResponse({ status: 200, description: 'Game config updated successfully' })
  async updateGameConfig(@Body() config: GameConfig) {
    return this.gameConfigService.updateGameConfig(config);
  }
}
