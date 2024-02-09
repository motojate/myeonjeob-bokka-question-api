import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';
import { UserService } from './user.service';
import { BaseResponse } from 'src/shared/responses/base.response';
import { map } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  async getUserNameAndInit(@Req() req: AuthenticationExpressRequest) {
    return this.userService
      .findUserName({
        userSeq: req.userSeq,
      })
      .pipe(
        map((userName) => BaseResponse.success<{ name: string }>(userName)),
      );
  }
}
