import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/model/users.model';
import { UsersService } from 'src/services/users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string
    ): Promise<User>{
        const salts = 10;
        const hashedPassword = await  bcrypt.hash(password, salts);
        const res = await this.usersService.createUser(username, hashedPassword);
        return res;
    }
}
