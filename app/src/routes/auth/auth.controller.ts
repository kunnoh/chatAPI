import { Body, Controller, Delete, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({summary: 'Authenticate user'})
  @ApiResponse({ status: 200, description: 'user authenticated'})
  @ApiResponse({ status: 401, description: 'user not authenticated'})
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {

    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

    @Post('refresh')
    @ApiOperation({summary: 'refresh token'})
    @ApiResponse({ status: 200, description: 'token refreshed'})
    @ApiResponse({ status: 403, description: 'user not logged in'})
    @ApiBody({ type: RefreshTokenDto })
    async refreshToken(@Body() body: RefreshTokenDto){
      return this.authService.refresh(body.refreshToken);
    }
    @Delete('logout')
    @ApiOperation({summary: 'log out user'})
    @ApiResponse({ status: 200, description: 'user logged out'})
    @ApiBody({ type: RefreshTokenDto })
    async logout(@Body() body: RefreshTokenDto) {
      return this.authService.logout(body.refreshToken);
    }
}