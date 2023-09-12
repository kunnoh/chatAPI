import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('home')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'home route for the api' })
  @ApiResponse({ status: 200, description: 'Welcome to chatApi' })
  @Get()
  getHello(): { message: string, status } {
    return this.appService.getHello();
  }
}