import { IsFormattedDate } from '@/shared/formatter';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NULL = '',
}

export class CreateProfileDTO {
  @IsString()
  @ApiProperty({ example: 'john doe' })
  readonly displayName: string;

  @IsEnum(Gender)
  @ApiProperty({ example: 'male' })
  readonly gender: Gender;

  @IsFormattedDate()
  @ApiProperty({ example: '1990-12-05' })
  readonly birthday: string;

  @IsNumber()
  @ApiProperty({ example: 165 })
  readonly height: number;

  @IsNumber()
  @ApiProperty({ example: 65 })
  readonly weight: number;
}
