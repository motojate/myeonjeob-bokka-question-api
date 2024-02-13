import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EachMessagePayload, Kafka } from 'kafkajs';

@Injectable()
export class AppService {
  private kafka = new Kafka({
    clientId: 'bokka-question',
    brokers: ['kafka:9092'],
  });
  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: 'bokka-question-group' });

  constructor() {
    this.consumer.connect(); //접속
    this.consumer.subscribe({ topics: ['test_a', 'test_b'] }); //구독
    this.consumer.run({
      eachMessage: this.consumerCallback,
    });
  }
  async consumerCallback(payload: EachMessagePayload) {
    //메세지 수신 콜백
    console.log('kafka message arrived');
    console.log(
      `topic: ${payload.topic}, Message:${payload.message.value.toString()}`,
    );
  }
}
