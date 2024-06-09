import {Injectable, HttpStatus, HttpException} from '@nestjs/common';
import {CreateOrderDto} from "./dto/create-order.dto";
import {PrismaService} from "../prisma/prisma.service";
import {$Enums} from ".prisma/client";

@Injectable()
export class OrdersService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async create({products, user_id}: CreateOrderDto) {
        const availableRobot = await this.prismaService.robots.findFirst({
            where: {
                Orders: {
                    none: {
                        status: $Enums.Statuses.PROCESSING
                    }
                }
            }
        })

        if (!availableRobot) {
            throw new HttpException('No robots available', HttpStatus.NOT_FOUND)
        }

        return this.prismaService.orders.create({
            data: {
                user: user_id,
                product: JSON.stringify(products.map(({productId, quantity}) => ({
                    productId,
                    quantity
                }))),
                status: $Enums.Statuses.PROCESSING,
                robot: availableRobot.id
            }
        })
    }
}
