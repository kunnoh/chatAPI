import { Injectable, UnauthorizedException } from '@nestjs/common';
import RefreshToken from './entities/refreshToken.entitie';
import { UsersService } from 'src/routes/users/users.service';
import { User } from 'src/routes/users/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];

    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }

    async login(loginUser: LoginDto): Promise<{ accessToken: string, refreshToken: string } | undefined> {
        const { email, password } = loginUser;

        const user = await this.userService.GetUser(loginUser.email);
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const passValid = await user.validatePasswd(password);
        if (!passValid) throw new UnauthorizedException('Invalid email or password');

        const payload = {
            sub: user.id,
            email: user.email,
        };
        const token = await this.jwtService.signAsync(payload);
        // return { accessToken: token };
        return this.newRefreshAccess(payload);
    }

    async logout(refreshStr: string): Promise<void> {
        const rf = await this.retrieveRefreshToken(refreshStr);
        if (!rf) return;

        // delete refresh from db
        this.refreshTokens = this.refreshTokens.filter((r: RefreshToken) => r.id !== rf.id)
    }

    async refresh(refreshStr: string): Promise<string | undefined> {
        const rf = await this.retrieveRefreshToken(refreshStr);
        if (!rf) return undefined;
        const user = await this.userService.GetUser(rf.userId);
        if (!user) return undefined;

        const accessToken = {
            userId: rf.userId
        }
        return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: process.env.EXPIRES });
    }

    private retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
            if (typeof decoded === 'string') return undefined;
            return Promise.resolve(
                this.refreshTokens.find((token: RefreshToken) => token.id === decoded.id)
            );
        } catch (err) {
            return undefined;
        }
    }

    private async newRefreshAccess(
        user: User,
        values: { userAgent: string, ipAddress: string }
    ): Promise<{ accessToken: string, refreshToken: string } | undefined> {
        const id = this.refreshTokens.length === 0 ? null : this.refreshTokens[this.refreshTokens.length - 1].id + 1;
        const refreshObj = new RefreshToken({ id: id, ...values, userId: user.id });

        // store refresh token to db
        this.refreshTokens.push(refreshObj);

        return {
            refreshToken: refreshObj.sign(),
            accessToken: sign({
                userId: user.id,
            },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.EXPIRES,
                })
        }
    }
}
