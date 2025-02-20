import { IsString, IsNumber, IsNotEmpty, Min, Max, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameConfigDto {
  @ApiProperty({ description: 'Version number (e.g., v1.0.2)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^v\d+\.\d+\.\d+$/, { message: 'Version must be in format vX.Y.Z' })
  version: string;

  @ApiProperty({ description: 'Number of games between ads (e.g., 3 means show ads after every 3 games)' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  adsCycle: number;
}

export default CreateGameConfigDto;
