import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  receiverId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  senderId: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
