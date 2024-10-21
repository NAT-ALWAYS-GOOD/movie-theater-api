import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { Request } from 'express';
import { Public } from '../decorators/public.decorator';
import { SelfOrAdminGuard } from '../guards/selforadmin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createuser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Sign up', operationId: 'signUp', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'User has been created',
  })
  @Public()
  @Post('signup')
  signUp(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Login', operationId: 'login', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'User exists, token sent',
  })
  @Public()
  @Post('login')
  login(@Body() user: User) {
    return this.userService.login(user);
  }

  @ApiOperation({ summary: 'Get user profile', operationId: 'getProfile', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'User informations',
  })
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({ summary: 'Get all users', operationId: 'getAllUsers', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'All users',
  })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get a user', operationId: 'getUser', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'The user asked in the request',
  })
  @Get(':userId')
  @UseGuards(SelfOrAdminGuard)
  findOne(@Param('userId') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user', operationId: 'updateUser', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'User has been updated',
  })
  @UseGuards(SelfOrAdminGuard)
  @Put(':userId')
  update(@Param('userId') id: number, @Body() user: Partial<User>) {
    return this.userService.update(id, user);
  }

  @ApiOperation({ summary: 'Delete a user', operationId: 'deleteUser', tags: ['users'] })
  @ApiResponse({
    status: 200,
    description: 'User has been deleted',
  })
  @UseGuards(SelfOrAdminGuard)
  @Delete(':userId')
  @HttpCode(204)
  remove(@Param('userId') id: number) {
    return this.userService.remove(id);
  }
}
