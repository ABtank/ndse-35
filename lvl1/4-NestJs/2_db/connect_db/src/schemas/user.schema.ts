import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
