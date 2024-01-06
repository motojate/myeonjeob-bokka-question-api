import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() singUpMemberUser: { userSeq: string }) {
    return this.userService.create(singUpMemberUser);
  }
}
