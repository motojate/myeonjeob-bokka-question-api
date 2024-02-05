import {
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
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
  async initUser(@Req() req: AuthenticationExpressRequest) {
    const result = await this.userService.initUser({ userSeq: req.userSeq });
    return BaseResponse.success(result);
  }
}
