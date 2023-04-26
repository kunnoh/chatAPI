import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controllers/users/users.controller';
import { UserSchema } from 'src/model/users.model';
import { UsersService } from 'src/services/users/users.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    providers: [ UsersService ],
    controllers: [ UsersController ]
})
export class UsersModule {}
