import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { UsersModule } from './routes/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './routes/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWD'),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
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
