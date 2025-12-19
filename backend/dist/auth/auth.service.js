"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'name', 'password', 'provider'],
        });
        if (!user) {
            return null;
        }
        if (user.provider !== user_entity_1.AuthProvider.LOCAL || !user.password) {
            throw new common_1.UnauthorizedException('Please use social login');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const { password: _, ...result } = user;
        return result;
    }
    async login(user) {
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
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            provider: user_entity_1.AuthProvider.LOCAL,
        });
        await this.userRepository.save(user);
        const { password, ...result } = user;
        return result;
    }
    async findOrCreateOAuthUser(profile, provider) {
        const providerId = profile.id;
        const email = profile.emails?.[0]?.value || profile.email;
        if (!email) {
            throw new common_1.UnauthorizedException('Email not provided by OAuth provider');
        }
        let user = await this.userRepository.findOne({
            where: { [`${provider.toLowerCase()}Id`]: providerId },
        });
        if (user) {
            return user;
        }
        user = await this.userRepository.findOne({
            where: { email },
        });
        if (user) {
            user[`${provider.toLowerCase()}Id`] = providerId;
            if (profile.photos?.[0]?.value && !user.profilePicture) {
                user.profilePicture = profile.photos[0].value;
            }
            await this.userRepository.save(user);
            return user;
        }
        const newUser = this.userRepository.create({
            email,
            name: profile.displayName || profile.name?.givenName || email.split('@')[0],
            provider,
            [`${provider.toLowerCase()}Id`]: providerId,
            profilePicture: profile.photos?.[0]?.value || profile.picture,
        });
        return await this.userRepository.save(newUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map