import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService){}

    async validateUser(username: string, password: string): Promise<object> {
        const user = await this.userService.getUser({username});
        if(!user) return null;
        const validPass = await bcrypt.compare(password, user.password);
        if(!user) throw new NotAcceptableException('user not found');
        if (user && validPass) return user;
        return null;
    }

    async login(user: {username: string, _id: string}): Promise<object> {
        const plod = {
            username: user.username,
            sub: user._id
        };
        return {
            access_token: this.jwtService.sign(plod)
        };
    }
}
