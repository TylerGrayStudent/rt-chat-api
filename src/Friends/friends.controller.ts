import { Body, Controller, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { SendFriendRequestDto } from './models/SendFriendRequestDto';

@Controller('users/friends')
export class FriendsController {
  constructor(private service: FriendsService) {}

  @Post()
  sendFriendRequest(@Body() friendRequest: SendFriendRequestDto) {
    return this.service.sendFriendRequest(
      friendRequest.requester,
      friendRequest.requested,
    );
  }
}
