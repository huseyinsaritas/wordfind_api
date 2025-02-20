import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateWordDto {
  @ApiProperty({ description: 'The content of the word' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  content: string;

  @ApiProperty({ description: 'The title of the word' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  title: string;
}

export default CreateWordDto;
