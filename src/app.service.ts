import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async login() {
    const dto = {
      userId: 'motojate@naver.com',
      password: 'qwer1234',
      siteType: 'MYEONJEOB_BOKKA',
      loginProvider: 'LOCAL',
    };
    const response = await axios.post(
      'http://localhost:3100/api/auth/login',
      dto,
    );
    return response.data;
  }
}
