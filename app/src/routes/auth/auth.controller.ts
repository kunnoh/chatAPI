import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({ status: 200, description: 'user authenticated' })
  @ApiResponse({ status: 401, description: 'user not authenticated' })
  async login(@Req() request, @Ip() ip: string, @Body() user: LoginDto) {
    const { email, password } = user;
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 201, description: 'user created' })
  @ApiResponse({ status: 400, description: 'missing attributes' })
  async register(@Req() request, @Ip() ip: string, @Body() body: RegisterDto) {
    console.log(body)
    const { email, password, phone } = body;
    return this.usersService.createUser({ email, password, phone });
  }

  @Post('refresh')
  @ApiOperation({ summary: 'refresh token' })
  @ApiResponse({ status: 200, description: 'token refreshed' })
  @ApiResponse({ status: 403, description: 'user not logged in' })
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'request password reset link' })
  @ApiResponse({ status: 200, description: 'link sent to email' })
  @ApiResponse({ status: 200, description: 'account does not exist' })
  @ApiBody({ type: RefreshTokenDto })
  async forgotPassword(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'log out user' })
  @ApiResponse({ status: 200, description: 'user logged out' })
  @ApiResponse({ status: 403, description: 'user is logged out' })
  @ApiBody({ type: RefreshTokenDto })
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }
}