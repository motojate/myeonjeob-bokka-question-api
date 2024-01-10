import { Request } from 'express';

export interface AuthenticationExpressRequest extends Request {
  userSeq: string;
}
