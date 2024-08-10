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

import { Profile } from '@/domain/entities/user/profile.entity';

import { CreateProfileDTO } from '../../application/modules/profile/dtos/create-profile.dto';
import { ApiResponse } from '../../application/dto/api-response.dto';
import { UpdateProfileDTO } from '../../application/modules/profile/dtos/update-profile.dto';
import { ProfileServiceImpl } from '../../application/modules/profile/service/profile.service';

@Controller()
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileServiceImpl) {}

  // CREATE PROFILE
  @Post('/createProfile/:email')
  @ApiBody({ type: CreateProfileDTO })
  @ApiParam({ type: String, name: 'email' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Create Profile has been succesfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthings wrong',
  })
  async createProfile(
    @Param('email') email: string,
    @Body() createProfileDTO: CreateProfileDTO,
  ): Promise<ApiResponse<Profile>> {
    const updateProfile = await this.profileService.create(
      email,
      createProfileDTO,
    );

    if (!updateProfile)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Somthings wrong',
        updateProfile,
      );

    return new ApiResponse(
      HttpStatus.CREATED,
      'Create Profile has been succesfully',
      updateProfile,
    );
  }

  // UPDATE PROFILE
  @Patch('/updateProfile/:id')
  @ApiBody({ type: UpdateProfileDTO })
  @ApiParam({ type: String, name: 'id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Update Profile has been succesfully',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Somthings wrong',
  })
  async updateProfile(
    @Param('id') id: string,
    @Body() createProfileDTO: CreateProfileDTO,
  ): Promise<ApiResponse<Profile>> {
    const updateProfile = await this.profileService.update(
      id,
      createProfileDTO,
    );

    if (!updateProfile)
      return new ApiResponse(
        HttpStatus.BAD_REQUEST,
        'Somthings wrong',
        updateProfile,
      );

    return new ApiResponse(
      HttpStatus.OK,
      'Update Profile has been succesfully',
      updateProfile,
    );
  }

  // GET PROFILE
  @Get('/getProfile/:id')
  @ApiParam({ type: String, name: 'id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Ok',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async getProfile(@Param('id') id: string): Promise<ApiResponse<Profile>> {
    const profile = await this.profileService.findOneById(id);

    if (!profile)
      return new ApiResponse(
        HttpStatus.NOT_FOUND,
        'Profile not found',
        profile,
      );

    return new ApiResponse(HttpStatus.OK, 'Ok', profile);
  }
}
