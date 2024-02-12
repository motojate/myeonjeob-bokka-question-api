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
import {
  AuthenticationExpressRequest,
  UserNameInterface,
} from 'src/shared/types/common.type';
import { UserService } from './user.service';
import { BaseResponse } from 'src/shared/responses/base.response';
import { Observable, map } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  getUserNameAndInit(
    @Req() req: AuthenticationExpressRequest,
  ): Observable<BaseResponse<UserNameInterface>> {
    return this.userService
      .findUserName({
        userSeq: req.userSeq,
      })
      .pipe(
        map((userName) => BaseResponse.success<UserNameInterface>(userName)),
      );
  }
}
