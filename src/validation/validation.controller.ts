/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ValidationService } from './validation.service';

@ApiTags('Validation')
@Controller('isValid')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Get(':word')
  @ApiParam({ name: 'word', type: 'string', description: 'Word to validate' })
  @ApiResponse({ status: 200, description: 'Successfully validated word' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTr(@Param('word') word: string) {
    try {
      const isValid = await this.validationService.isValidWord(word, 'TR');
      return {
        success: true,
        message: 'success',
        data: isValid,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Internal server error',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':word/:lan')
  @ApiParam({ name: 'word', type: 'string', description: 'Word to validate' })
  @ApiParam({
    name: 'lan',
    type: 'string',
    enum: ['TR', 'EN'],
    description: 'Language (TR or EN)',
  })
  @ApiResponse({ status: 200, description: 'Successfully validated word' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async get(@Param('word') word: string, @Param('lan') lan: string) {
    try {
      const language = lan.toUpperCase() !== 'EN' ? 'TR' : 'EN';
      const isValid = await this.validationService.isValidWord(word, language);
      return {
        success: true,
        message: 'success',
        data: isValid,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Internal server error',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
