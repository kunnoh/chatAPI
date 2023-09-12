import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string, status: string } {
    return {
      status: 'success',
      message: 'Welcome to RESTful ChatApi'
    };
  }
}
