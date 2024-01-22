import { Request } from 'express';

export interface AuthenticationExpressRequest extends Request {
  userSeq: string;
}

export interface HeaderToken {
  accessToken: string;
  refreshToken: string;
}

export interface BaseExceptionErrorStateInferface {
  code: number;
  result: {
    error: {
      message: string;
    };
  };
}
