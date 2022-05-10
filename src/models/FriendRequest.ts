import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FriendRequestDocument = FriendRequest & Document;

@Schema()
export class FriendRequest {
  @Prop()
  _id: string;

  @Prop()
  type: 'Pending' | 'Accepted' | 'Declined';

  @Prop()
  requester: string;

  @Prop()
  requested: string;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
