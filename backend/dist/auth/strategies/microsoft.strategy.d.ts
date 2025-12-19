import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const MicrosoftStrategy_base: new (...args: any) => any;
export declare class MicrosoftStrategy extends MicrosoftStrategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};
