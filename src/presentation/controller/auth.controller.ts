import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { RegisterDTO } from '../../application/modules/auth/dtos/register.dto';
import { ApiResponse } from '../../application/dto/api-response.dto';
import { LoginDTO } from '../../application/modules/auth/dtos/login.dto';
import { AuthServiceImpl } from '../../application/modules/auth/service/auth.service';

import { User } from '@/domain/entities/user/user.entity';

import { LocalAuthGuard } from '@/application/modules/auth/guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthServiceImpl) {}

  // REGISTER
  @Post('/register')
  @ApiBody({ type: RegisterDTO })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Register successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Something Wrong',
  })
  async register(@Body() registerDTO: RegisterDTO): Promise<ApiResponse<User>> {
    const newUser = await this.authService.register(registerDTO);

    if (!newUser)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Something Wrong',
        newUser,
      );

    return new ApiResponse(
      HttpStatus.CREATED,
      'Register successfully',
      newUser,
    );
  }

  // LOGIN
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoginDTO })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Login Successfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Check your email/password',
  })
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> {
    const token = await this.authService.login(loginDTO, response);

    if (!token)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Check your email/password',
        token,
      );

    return new ApiResponse(HttpStatus.NO_CONTENT, 'Login Successfully', token);
  }
}
