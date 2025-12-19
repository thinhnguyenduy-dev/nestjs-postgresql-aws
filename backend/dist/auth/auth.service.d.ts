import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, AuthProvider } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        provider: AuthProvider;
        googleId?: string;
        facebookId?: string;
        appleId?: string;
        microsoftId?: string;
        profilePicture?: string;
        createdAt: Date;
        updatedAt: Date;
        orders: import("../orders/entities/order.entity").Order[];
    }>;
    findOrCreateOAuthUser(profile: any, provider: AuthProvider): Promise<User>;
}
