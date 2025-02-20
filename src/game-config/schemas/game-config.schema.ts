import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GameConfigDocument = HydratedDocument<GameConfig>;

@Schema({
  timestamps: true,
  collection: 'game_config',
})
export class GameConfig {
  @ApiProperty({
    example: '1.0.0',
    description: 'Version of the game configuration',
  })
  @Prop({ required: true })
  version: string;

  @ApiProperty({ example: 3, description: 'Number of ad cycles', minimum: 1 })
  @Prop({ required: true, min: 1 })
  adsCycle: number;
}

export const GameConfigSchema = SchemaFactory.createForClass(GameConfig);

GameConfigSchema.index({}, { unique: true });
