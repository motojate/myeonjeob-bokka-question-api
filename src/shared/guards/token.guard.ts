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

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateToken(request.headers).pipe(
      map((userSeq) => {
        request.userSeq = userSeq;
        return true;
      }),
    );
  }

  private validateToken(headers: Record<string, string>): Observable<boolean> {
    const url = this.configService.get<string>('LOCAL_JWT_CHECK_URL');

    return from(axios.get(url, { headers, withCredentials: true })).pipe(
      map((response) => response.data),
      catchError((err) => {
        throw new HttpException(err.response.data, err.response.status);
      }),
    );
  }
}
