import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            name: string;
            provider: import("../users/entities/user.entity").AuthProvider;
            googleId?: string;
            facebookId?: string;
            appleId?: string;
            microsoftId?: string;
            profilePicture?: string;
            createdAt: Date;
            updatedAt: Date;
            orders: import("../orders/entities/order.entity").Order[];
        };
    }>;
    login(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
    getProfile(user: any): any;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    facebookAuth(): Promise<void>;
    facebookAuthCallback(req: any, res: Response): Promise<void>;
    microsoftAuth(): Promise<void>;
    microsoftAuthCallback(req: any, res: Response): Promise<void>;
}
