import { IUser } from './user.interface';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Document & IUser;

@Schema()
export class User {
  @Prop({ required: true })
  public login: string;

  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
