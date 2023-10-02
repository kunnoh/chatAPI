import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './routes/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { Chat } from './chat.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWD'),
        database: configService.get('DB_NAME'),
        entities: [
          Chat,
          path.join(__dirname, './*.entity{.ts,.js}')
        ],
        synchronize: true,
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule { }
