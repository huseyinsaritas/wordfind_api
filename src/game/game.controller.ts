import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { Word } from './schemas/word.schema';

@ApiTags('Words') // Swagger için kategori etiketi
@Controller('word')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':len')
  @ApiResponse({ status: 200, description: 'Successfully retrieved word data' })
  async getTr(@Param('len') len: number) {
    const wordData = await this.gameService.getWordData(len, 'TR');
    return {
      success: true,
      message: 'success',
      data: wordData,
    };
  }

  @Get(':len/:lan')
  @ApiResponse({ status: 200, description: 'Successfully retrieved word data' })
  async get(@Param('len') len: number, @Param('lan') lan: string) {
    const language = lan.toUpperCase() !== 'EN' ? 'TR' : 'EN';
    const wordData = await this.gameService.getWordData(len, language);
    return {
      success: true,
      message: 'success',
      data: wordData,
    };
  }

  @Post()
  @ApiQuery({
    name: 'language',
    enum: ['TR', 'EN'],
    required: true,
    description: 'Language of the word',
  })
  @ApiBody({ type: Word })
  @ApiResponse({ status: 201, description: 'Word inserted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Only words with 5, 6, or 7 letters are allowed.',
  })
  async insert(
    @Body() body: { word: string },
    @Query('language') language: string,
  ) {
    const { word } = body;

    if (typeof word !== 'string' || !word.trim()) {
      throw new BadRequestException(
        'Invalid word. Expected a non-empty string.',
      );
    }

    const len = word.length;
    if (![5, 6, 7].includes(len)) {
      throw new BadRequestException(
        'Only words with 5, 6, or 7 letters are allowed.',
      );
    }

    // Query paramdan gelen `language` büyük harfe çevrilerek kontrol edilir
    const lang = language?.toUpperCase() === 'EN' ? 'EN' : 'TR';

    const insertedWord = await this.gameService.insertWord(word, len, lang);
    return {
      success: true,
      message: 'Word inserted successfully',
      data: insertedWord,
    };
  }

  @Delete(':word')
  @ApiResponse({ status: 200, description: 'Word deleted successfully' })
  @ApiResponse({ status: 404, description: 'Word not found' })
  async deleteWord(@Param('word') word: string) {
    const wasDeleted = await this.gameService.deleteWord(word);
    if (!wasDeleted) {
      return {
        success: false,
        message: 'Word not found',
        data: null,
      };
    }
    return {
      success: true,
      message: 'Word deleted successfully',
    };
  }

  @Delete('id/:id')
  @ApiResponse({ status: 200, description: 'Word deleted successfully' })
  @ApiResponse({ status: 404, description: 'Word not found' })
  async deleteWordById(@Param('id') id: number) {
    const wasDeleted = await this.gameService.deleteWordById(id);
    if (!wasDeleted) {
      return {
        success: false,
        message: 'Word not found',
        data: null,
      };
    }
    return {
      success: true,
      message: 'Word deleted successfully',
    };
  }
}
