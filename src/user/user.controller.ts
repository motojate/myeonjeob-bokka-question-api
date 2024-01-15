import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { UserInitInterceptor } from 'src/shared/interceptors/user-init.interceptor';
import { AuthenticationExpressRequest } from 'src/shared/types/common.type';
import { UserService } from './user.service';
import { map } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put()
  @UseGuards(TokenGuard)
  @UseInterceptors(UserInitInterceptor)
  findRank(
    @Req() req: AuthenticationExpressRequest,

    @Body('nickName') nickName: any,
  ) {
    console.log(nickName);
    return 1;
  }
}
