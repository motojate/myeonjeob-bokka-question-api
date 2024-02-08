import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScoreCreateInputDto {
  @ApiProperty({
    example: 'qwer-asdf-zxcv-1234',
    description: '문제를 푼 유저의 seq',
  })
  readonly userSeq: string;

  @ApiProperty({ example: 5, description: '오답 입력 횟수' })
  readonly wrongAnswerCount: number;
}

export class ManageCreateInputDto {
  @IsNotEmptyObject()
  @ApiProperty({
    type: ScoreCreateInputDto,
    description: '점수 생성 입력 데이터',
  })
  @ValidateNested()
  @Type(() => ScoreCreateInputDto)
  readonly scoreCreateInputDto: ScoreCreateInputDto;

  @ApiProperty({ example: 'qwer-asdf-zxcv-1234', description: '문제의 seq' })
  @IsString()
  @IsNotEmpty()
  readonly questionSeq: string;
}
