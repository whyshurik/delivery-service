import {Body, Controller, Post, Put} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    @Post()
    async create(@Body() dto:CreateOrderDto){
        return this.ordersService.create(dto)
    }
    @Put()
    async setSuccessStatus(@Body() data) {
        return this.ordersService.setStatus(data.id)
    }
}
