import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  content: string;
}
