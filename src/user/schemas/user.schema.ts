import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  collection: 'user',
})
export class User {
  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({
    example: '123456789abcdef',
    description: 'Device ID of the user',
  })
  @Prop({ required: true })
  deviceId: string;

  @ApiProperty({ example: 5, description: 'Total game count of the user' })
  @Prop({ required: true })
  gameCount: number;

  @ApiProperty({
    example: 1700000000,
    description: 'Last updated time (timestamp)',
  })
  @Prop({ required: true })
  updatedTime: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ deviceId: 1, username: 1 }, { unique: true });
