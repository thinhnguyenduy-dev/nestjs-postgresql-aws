import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: ((configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default-secret',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
        },
      })) as any,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // OAuth strategies - only if credentials are configured
    {
      provide: 'GOOGLE_STRATEGY',
      useFactory: (configService: ConfigService, authService: AuthService) => {
        const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
        if (clientID && clientID !== '') {
          return new GoogleStrategy(configService, authService);
        }
        return null;
      },
      inject: [ConfigService, AuthService],
    },
    {
      provide: 'FACEBOOK_STRATEGY',
      useFactory: (configService: ConfigService, authService: AuthService) => {
        const appID = configService.get<string>('FACEBOOK_APP_ID');
        if (appID && appID !== '') {
          return new FacebookStrategy(configService, authService);
        }
        return null;
      },
      inject: [ConfigService, AuthService],
    },
    {
      provide: 'MICROSOFT_STRATEGY',
      useFactory: (configService: ConfigService, authService: AuthService) => {
        const clientID = configService.get<string>('MICROSOFT_CLIENT_ID');
        if (clientID && clientID !== '') {
          return new MicrosoftStrategy(configService, authService);
        }
        return null;
      },
      inject: [ConfigService, AuthService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
