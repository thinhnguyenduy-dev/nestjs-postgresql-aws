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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
const user_entity_1 = require("../../users/entities/user.entity");
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'facebook') {
    configService;
    authService;
    constructor(configService, authService) {
        super({
            clientID: configService.get('FACEBOOK_APP_ID') || '',
            clientSecret: configService.get('FACEBOOK_APP_SECRET') || '',
            callbackURL: configService.get('FACEBOOK_CALLBACK_URL') || 'http://localhost:3000/auth/facebook/callback',
            scope: 'email',
            profileFields: ['emails', 'name', 'photos'],
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const user = await this.authService.findOrCreateOAuthUser(profile, user_entity_1.AuthProvider.FACEBOOK);
            done(null, user);
        }
        catch (error) {
            done(error, false);
        }
    }
};
exports.FacebookStrategy = FacebookStrategy;
exports.FacebookStrategy = FacebookStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], FacebookStrategy);
//# sourceMappingURL=facebook.strategy.js.map