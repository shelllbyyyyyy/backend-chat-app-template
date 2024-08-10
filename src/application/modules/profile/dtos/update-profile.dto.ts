import { Optional } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { IsFormattedDate } from '@/shared/formatter';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NULL = '',
}

export class UpdateProfileDTO {
  @IsString()
  @ApiPropertyOptional({ example: 'john doe' })
  @Optional()
  readonly displayName: string;

  @IsEnum(Gender)
  @ApiPropertyOptional({ example: 'male' })
  @Optional()
  readonly gender: Gender;

  @IsFormattedDate()
  @ApiPropertyOptional({ example: '1990-12-05' })
  @Optional()
  readonly birthday: string;

  @IsNumber()
  @ApiPropertyOptional({ example: 165 })
  @Optional()
  readonly height: number;

  @IsNumber()
  @ApiPropertyOptional({ example: 65 })
  @Optional()
  readonly weight: number;
}
