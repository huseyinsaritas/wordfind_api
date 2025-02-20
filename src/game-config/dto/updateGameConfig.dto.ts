import { IsString, IsNumber, IsOptional, Min, Max, Matches, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGameConfigDto {
  @ApiPropertyOptional({ description: 'Version number (e.g., v1.0.2)' })
  @IsString()
  @Matches(/^v\d+\.\d+\.\d+$/, { message: 'Version must be in format vX.Y.Z' })
  @ValidateIf((o) => o.version !== undefined || !o.adsCycle)
  version: string;

  @ApiPropertyOptional({ description: 'Number of games between ads (e.g., 3 means show ads after every 3 games)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  @ValidateIf((o) => o.adsCycle !== undefined || !o.version)
  adsCycle: number;
}

export default UpdateGameConfigDto;
