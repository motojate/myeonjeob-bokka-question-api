import {
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { UserInitInterceptor } from 'src/shared/interceptors/user-init.interceptor';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';
import { UserService } from './user.service';
import { map } from 'rxjs';
import { BaseResponse } from 'src/shared/responses/base.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('init')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInitInterceptor)
  findRank(@Req() req: AuthenticationExpressRequest) {
    return this.userService
      .initUser({ userSeq: req.userSeq })
      .pipe(map((user) => BaseResponse.success(user)));
  }
}
