import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserInitInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userSeq = request.userSeq;
    return this.userService.findUser({ userSeq }).pipe(
      switchMap((user) => {
        if (!user)
          return this.userService
            .initUser({ userSeq })
            .pipe(switchMap(() => next.handle()));
        else return next.handle();
      }),
    );
  }
}
