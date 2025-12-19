import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
export declare class OrdersService {
    private ordersRepository;
    private orderItemsRepository;
    constructor(ordersRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>);
    create(createOrderDto: CreateOrderDto): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order | null>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
