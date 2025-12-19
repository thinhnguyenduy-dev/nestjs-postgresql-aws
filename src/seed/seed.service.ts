import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { OrderStatus } from '../orders/entities/order.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async seed() {
    this.logger.log('Starting seed...');

    // 1. Create Users
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const user = this.userRepository.create({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: 'password123', // In real app, this should be hashed
      });
      users.push(await this.userRepository.save(user));
    }
    this.logger.log(`Created ${users.length} users.`);

    // 2. Create Products
    const products: Product[] = [];
    for (let i = 0; i < 20; i++) {
      const product = this.productRepository.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
        stock: faker.number.int({ min: 0, max: 100 }),
      });
      products.push(await this.productRepository.save(product));
    }
    this.logger.log(`Created ${products.length} products.`);

    // 3. Create Orders
    for (let i = 0; i < 15; i++) {
      const user = faker.helpers.arrayElement(users);
      
      const order = this.orderRepository.create({
        user,
        status: faker.helpers.enumValue(OrderStatus),
        totalAmount: 0, // Will calculate below
      });
      await this.orderRepository.save(order);

      // Create Order Items
      let totalAmount = 0;
      const numItems = faker.number.int({ min: 1, max: 5 });
      const orderItems: OrderItem[] = [];

      for (let j = 0; j < numItems; j++) {
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 3 });
        const price = product.price; // Snapshot price at time of order

        const orderItem = this.orderItemRepository.create({
          order,
          product,
          quantity,
          price,
        });
        orderItems.push(await this.orderItemRepository.save(orderItem));
        totalAmount += price * quantity;
      }
      
      // Update order total
      order.totalAmount = totalAmount;
      await this.orderRepository.save(order);
    }
    this.logger.log('Created 15 orders.');

    this.logger.log('Seeding complete!');
  }
}
