import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HeaderToken } from '../types/common.type';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { access_token: accessToken, refresh_token: refreshToken } =
      request.cookies;
    const tokens: HeaderToken = {
      accessToken,
      refreshToken,
    };
    return from(this.validateToken(tokens)).pipe(
      map((userSeq) => {
        console.log(userSeq);
        request.userSeq = userSeq;

        return true;
      }),
    );
  }

  private async validateToken(tokens: HeaderToken): Promise<boolean> {
    const url = this.configService.get<string>('LOCAL_JWT_CHECK_URL');

    return axios.post(url, { tokens });
  }
}
