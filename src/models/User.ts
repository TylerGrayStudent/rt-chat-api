import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { FriendRequest } from './FriendRequest';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: [String] })
  friends: string[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FriendRequest',
        required: true,
      },
    ],
  })
  friendRequests: FriendRequest[];
}

export const UserSchema = SchemaFactory.createForClass(User);
