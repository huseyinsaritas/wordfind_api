import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class UpdateWordDto {
  @ApiPropertyOptional({ description: 'The content of the word' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  content?: string;

  @ApiPropertyOptional({ description: 'The title of the word' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title?: string;

  id: number;
}

export default UpdateWordDto;
