import { Order } from '../../orders/entities/order.entity';
export declare enum AuthProvider {
    LOCAL = "local",
    GOOGLE = "google",
    FACEBOOK = "facebook",
    APPLE = "apple",
    MICROSOFT = "microsoft"
}
export declare class User {
    id: string;
    email: string;
    name: string;
    password?: string;
    provider: AuthProvider;
    googleId?: string;
    facebookId?: string;
    appleId?: string;
    microsoftId?: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
}
