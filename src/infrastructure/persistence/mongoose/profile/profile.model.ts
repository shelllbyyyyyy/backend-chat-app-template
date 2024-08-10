import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NULL = '',
}

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Profile {
  @Prop({ type: String, required: true })
  displayName: string;

  @Prop({ type: String, required: true, enum: Gender })
  gender: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ type: String, required: true })
  horoscope: string;

  @Prop({ type: String, required: true })
  zodiac: string;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
