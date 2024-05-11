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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  signUp(@Body() user: User) {
    return this.userService.create(user);
  }

  @Public()
  @Post('login')
  login(@Body() user: User) {
    return this.userService.login(user);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @UseGuards(SelfOrAdminGuard)
  findOne(@Param('userId') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(SelfOrAdminGuard)
  @Put(':userId')
  update(@Param('userId') id: number, @Body() user: Partial<User>) {
    return this.userService.update(id, user);
  }

  @UseGuards(SelfOrAdminGuard)
  @Delete(':userId')
  @HttpCode(204)
  remove(@Param('userId') id: number) {
    return this.userService.remove(id);
  }
}
