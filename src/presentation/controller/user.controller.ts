import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse } from '../../application/dto/api-response.dto';
import { User } from '@/domain/entities/user/user.entity';
import { UserServiceImpl } from '../../application/modules/user/service/user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserServiceImpl) {}

  // GET ALL USER
  @Get()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '',
  })
  async getAllUser(): Promise<ApiResponse<User[]>> {
    const all = await this.userService.findAll();

    return new ApiResponse(HttpStatus.OK, 'Ok', all);
  }

  @Get('/:email')
  @ApiParam({ type: String, name: 'email' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Ok',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async getUser(@Param('email') email: string): Promise<ApiResponse<User>> {
    const user = await this.userService.findOne(email);

    if (!user)
      return new ApiResponse(HttpStatus.NOT_FOUND, 'User not found', user);

    return new ApiResponse(HttpStatus.OK, 'Ok', user);
  }
}
