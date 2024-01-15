import { Request } from 'express';

export interface AuthenticationExpressRequest extends Request {
  userSeq: string;
}
export interface HeaderToken {
  accessToken: string;
  refreshToken: string;
}
