import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { Request } from 'express';
import { Public } from '../decorators/public.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { SelfOrAdminGuard } from '../guards/selforadmin.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'User has been created',
  })
  @Public()
  @Post('signup')
  signUp(@Body() user: User) {
    return this.userService.create(user);
  }

  @ApiResponse({
    status: 200,
    description: 'User exists, token sent',
  })
  @Public()
  @Post('login')
  login(@Body() user: User) {
    return this.userService.login(user);
  }

  @ApiResponse({
    status: 200,
    description: 'User informations',
  })
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @ApiResponse({
    status: 200,
    description: 'List of all users',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The user asked in the request',
  })
  @Get(':userId')
  @UseGuards(SelfOrAdminGuard)
  findOne(@Param('userId') id: number) {
    return this.userService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'User has been updated',
  })
  @UseGuards(SelfOrAdminGuard)
  @Put(':userId')
  update(@Param('userId') id: number, @Body() user: Partial<User>) {
    return this.userService.update(id, user);
  }

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
