import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type WordDocument = Word & Document;

@Schema()
export class Word {
  @ApiProperty({ example: 1, description: 'Unique ID for the word' })
  @Prop({ required: true })
  id: number;

  @ApiProperty({ example: 5, description: 'Length of the word' })
  @Prop({ required: true })
  len: number;

  @ApiProperty({ example: 'kitap', description: 'The word itself' })
  @Prop({ required: true })
  word: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
