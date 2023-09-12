import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/routes/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get user by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 200, description: 'user' })
  @ApiResponse({ status: 400, description: 'missing query' })
  @Get('/:id')
  user(@Req() request) {
    const userId = request.user.userId;
    return this.usersService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get many users' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 400, description: 'missing query' })
  @ApiResponse({ status: 200, description: 'users array' })
  @Get('')
  users(@Req() request) {
    const page = request.body.page
    const limit = request.body.limit
    return this.usersService.findAll({ page, limit })
  }
}
