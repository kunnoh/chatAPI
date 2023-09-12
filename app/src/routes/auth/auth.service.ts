import { Injectable } from '@nestjs/common';
import RefreshToken from './entities/refreshToken.entitie';
import { UsersService } from 'src/routes/users/users.service';
import { User } from 'src/routes/users/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];

    constructor(private userService: UsersService) { }

    async login(
        email: string,
        password: string,
        values: { userAgent: string, ipAddress: string }
    ): Promise<{ accessToken: string, refreshToken: string } | undefined> {
        const user = await this.userService.findByEmail(email);
        if (!user) return undefined;

        // TODO: verify using hashing
        if (user.password !== password) return undefined;

        return this.newRefreshAccess(user, values);
    }

    async register(
        {
            email,
            password,
            phone
        },
        values: { userAgent: string, ipAddress: string }
    ): Promise<{ accessToken: string, refreshToken: string } | undefined> {
        const user = await this.userService.findByEmail(email);
        if (!user) return undefined;

        // TODO: verify using hashing
        if (user.password !== password) return undefined;

        return this.newRefreshAccess(user, values);
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
        const user = await this.userService.findOne(rf.userId);
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
