import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('home')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'documentation' })
  @ApiResponse({ status: 200, description: 'ChatApi documentation' })
  @Get()
  getHello(): { message: string, status } {
    return this.appService.getHello();
  }
}