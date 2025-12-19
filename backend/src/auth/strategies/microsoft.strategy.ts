import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../users/entities/user.entity';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('MICROSOFT_CLIENT_ID') || 'disabled',
      clientSecret: configService.get<string>('MICROSOFT_CLIENT_SECRET') || 'disabled',
      callbackURL: configService.get<string>('MICROSOFT_CALLBACK_URL') || 'http://localhost:3000/auth/microsoft/callback',
      scope: ['user.read'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    try {
      const user = await this.authService.findOrCreateOAuthUser(
        profile,
        AuthProvider.MICROSOFT,
      );
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
