import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequest } from '../models/FriendRequest';
import { User, UserDocument } from '../models/User';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async sendFriendRequest(requester: string, requested: string) {
    console.log(`Sending friend request from ${requester} to ${requested}`);
    const requestedUser = await this.userModel.findOne({ _id: requested });
    if (!requestedUser) {
      throw new Error('User not found');
    }

    const requesterUser = await this.userModel.findOne({ _id: requester });
    if (!requesterUser) {
      throw new Error('User not found');
    }

    const friendRequest: FriendRequest = new FriendRequest();
    friendRequest.type = 'Pending';
    friendRequest.requester = requesterUser._id;
    friendRequest.requested = requestedUser._id;

    requestedUser.friendRequests.push(friendRequest);
    requesterUser.friendRequests.push(friendRequest);

    await requesterUser.save();
    await requestedUser.save();
  }
}
