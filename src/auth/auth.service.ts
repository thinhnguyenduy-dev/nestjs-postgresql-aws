import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, AuthProvider } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password', 'provider'],
    });

    if (!user) {
      return null;
    }

    // Check if user registered via OAuth
    if (user.provider !== AuthProvider.LOCAL || !user.password) {
      throw new UnauthorizedException('Please use social login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      provider: AuthProvider.LOCAL,
    });

    await this.userRepository.save(user);

    // Return user without password
    const { password, ...result } = user;
    return result;
  }

  async findOrCreateOAuthUser(profile: any, provider: AuthProvider) {
    const providerId = profile.id;
    const email = profile.emails?.[0]?.value || profile.email;

    if (!email) {
      throw new UnauthorizedException('Email not provided by OAuth provider');
    }

    // Try to find user by provider ID
    let user = await this.userRepository.findOne({
      where: { [`${provider.toLowerCase()}Id`]: providerId } as any,
    });

    if (user) {
      return user;
    }

    // Try to find user by email
    user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      // Link OAuth provider to existing account
      user[`${provider.toLowerCase()}Id`] = providerId;
      if (profile.photos?.[0]?.value && !user.profilePicture) {
        user.profilePicture = profile.photos[0].value;
      }
      await this.userRepository.save(user);
      return user;
    }

    // Create new user
    const newUser = this.userRepository.create({
      email,
      name: profile.displayName || profile.name?.givenName || email.split('@')[0],
      provider,
      [`${provider.toLowerCase()}Id`]: providerId,
      profilePicture: profile.photos?.[0]?.value || profile.picture,
    });

    return await this.userRepository.save(newUser);
  }
}
