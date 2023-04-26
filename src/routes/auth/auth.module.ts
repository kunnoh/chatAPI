import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/model/users.model';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
    imports: [UsersModule, PassportModule,
        JwtModule.register({
            secret: 'n4ut39urf89an398nfn9845ng5sg8naw8fnvonar3318924g899awn94n98nm',
            signOptions: { expiresIn: '60s' }
        }),
        MongooseModule.forFeature([{ name: "user", schema: UserSchema }])
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
