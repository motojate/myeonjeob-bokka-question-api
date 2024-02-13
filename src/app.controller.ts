import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
@ApiTags('test-login')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('bokka-question')
  helloKafka(@Payload() Payload) {
    console.log(JSON.stringify(Payload));
  }

  @EventPattern('bokka-question-event')
  handleMessage(Payload) {
    console.log(Payload);
  }
}
