import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ConnectedUserDocument = ConnectedUser & Document;

@Schema({ versionKey: false })
export class ConnectedUser {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({ type: String, required: true })
  sockedId: string;
}

export const ConnectedUserSchema = SchemaFactory.createForClass(ConnectedUser);
