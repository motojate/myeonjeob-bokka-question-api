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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  async getUserName(@Req() req: AuthenticationExpressRequest) {
    const result = await this.userService.findUserName({
      userSeq: req.userSeq,
    });
    if (result) return BaseResponse.success(result);
    else return BaseResponse.emptyData(null);
  }

  @Post('init')
  @HttpCode(200)
  @UseGuards(TokenGuard)
  async initUser(
    @Req() req: AuthenticationExpressRequest,
    @Body('name') name: string,
  ) {
    const result = await this.userService.initUser({
      userSeq: req.userSeq,
      name,
    });
    return BaseResponse.success(result);
  }
}
