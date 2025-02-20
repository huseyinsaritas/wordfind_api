import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':deviceId')
  @ApiParam({ name: 'deviceId', type: 'string', description: 'User device ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async get(@Param('deviceId') deviceId: string) {
    const user = await this.userService.getUser(deviceId);
    return {
      success: true,
      message: 'success',
      data: user,
    };
  }

  @Post()
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  async post(@Body() userData: User) {
    const user = await this.userService.saveUser(userData);
    return {
      success: true,
      message: 'success',
      data: user,
    };
  }
}
