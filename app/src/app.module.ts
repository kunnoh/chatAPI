import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot()
    ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
