import {Injectable, HttpStatus, HttpException} from '@nestjs/common';
import {CreateOrderDto} from "./dto/create-order.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class OrdersService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async create({ product_id, user_id, robot_id }: CreateOrderDto) {
        const exist = await this.prismaService.orders.findFirst({
            where: {
                product: product_id,
                user: user_id,
                robot: robot_id
            }
        })

        if (exist) {
            throw new HttpException('Order already exist', HttpStatus.BAD_REQUEST)
        }

        return this.prismaService.orders.create({
            data: {
                product: product_id,
                user: user_id,
                robot: robot_id
            }
        })
    }
}
