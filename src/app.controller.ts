import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('test-login')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
