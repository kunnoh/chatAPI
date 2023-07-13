import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/routes/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  user(@Req() request){
    const userId = request.user.userId;
    return this.usersService.findOne(userId);
  }

  @Get('')
  users(@Req() request){
    return this.usersService.findAll();
  }
}
