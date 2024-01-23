import axios from 'axios';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, from, throwError } from 'rxjs';
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
      map((result) => {
        const { data } = result;
        request.userSeq = data;
        return true;
      }),
      catchError((e) => throwError(() => e)),
    );
  }

  private async validateToken(tokens: HeaderToken) {
    const url = this.configService.get<string>('LOCAL_JWT_CHECK_URL');
    console.log(tokens);
    return axios.post<string>(url, { tokens });
  }
}
