import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
export declare class SeedService {
    private readonly userRepository;
    private readonly productRepository;
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, productRepository: Repository<Product>, orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    seed(): Promise<void>;
}
