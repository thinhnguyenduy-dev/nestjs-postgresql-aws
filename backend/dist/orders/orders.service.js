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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrdersService = class OrdersService {
    ordersRepository;
    orderItemsRepository;
    constructor(ordersRepository, orderItemsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
    }
    async create(createOrderDto) {
        const order = this.ordersRepository.create({
            user: { id: createOrderDto.userId },
            status: order_entity_1.OrderStatus.PENDING,
            totalAmount: 0
        });
        const savedOrder = await this.ordersRepository.save(order);
        const items = createOrderDto.items.map(item => {
            const orderItem = this.orderItemsRepository.create({
                order: savedOrder,
                product: { id: item.productId },
                quantity: item.quantity,
                price: 0
            });
            return orderItem;
        });
        await this.orderItemsRepository.save(items);
        return this.ordersRepository.findOne({ where: { id: savedOrder.id }, relations: ['items', 'items.product'] });
    }
    findAll() {
        return this.ordersRepository.find({ relations: ['items', 'user'] });
    }
    findOne(id) {
        return this.ordersRepository.findOne({ where: { id }, relations: ['items', 'user'] });
    }
    update(id, updateOrderDto) {
        return this.ordersRepository.update(id, updateOrderDto);
    }
    remove(id) {
        return this.ordersRepository.delete(id);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map