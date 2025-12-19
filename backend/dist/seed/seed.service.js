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
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const order_item_entity_1 = require("../orders/entities/order-item.entity");
const order_entity_2 = require("../orders/entities/order.entity");
let SeedService = SeedService_1 = class SeedService {
    userRepository;
    productRepository;
    orderRepository;
    orderItemRepository;
    logger = new common_1.Logger(SeedService_1.name);
    constructor(userRepository, productRepository, orderRepository, orderItemRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async seed() {
        this.logger.log('Starting seed...');
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = this.userRepository.create({
                email: faker_1.faker.internet.email(),
                name: faker_1.faker.person.fullName(),
                password: 'password123',
            });
            users.push(await this.userRepository.save(user));
        }
        this.logger.log(`Created ${users.length} users.`);
        const products = [];
        for (let i = 0; i < 20; i++) {
            const product = this.productRepository.create({
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.commerce.productDescription(),
                price: parseFloat(faker_1.faker.commerce.price({ min: 10, max: 1000 })),
                stock: faker_1.faker.number.int({ min: 0, max: 100 }),
            });
            products.push(await this.productRepository.save(product));
        }
        this.logger.log(`Created ${products.length} products.`);
        for (let i = 0; i < 15; i++) {
            const user = faker_1.faker.helpers.arrayElement(users);
            const order = this.orderRepository.create({
                user,
                status: faker_1.faker.helpers.enumValue(order_entity_2.OrderStatus),
                totalAmount: 0,
            });
            await this.orderRepository.save(order);
            let totalAmount = 0;
            const numItems = faker_1.faker.number.int({ min: 1, max: 5 });
            const orderItems = [];
            for (let j = 0; j < numItems; j++) {
                const product = faker_1.faker.helpers.arrayElement(products);
                const quantity = faker_1.faker.number.int({ min: 1, max: 3 });
                const price = product.price;
                const orderItem = this.orderItemRepository.create({
                    order,
                    product,
                    quantity,
                    price,
                });
                orderItems.push(await this.orderItemRepository.save(orderItem));
                totalAmount += price * quantity;
            }
            order.totalAmount = totalAmount;
            await this.orderRepository.save(order);
        }
        this.logger.log('Created 15 orders.');
        this.logger.log('Seeding complete!');
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map