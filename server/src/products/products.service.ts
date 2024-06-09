import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateProductDto} from "../products/dto/create-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }

    async getAllProducts() {
        return this.prismaService.products.findMany();
    }
}
//     async create({name, price}: CreateProductDto) {
//         return this.prismaService.products.create({
//             data: {
//                 name: name,
//                 price: price,
//             }
//         })
//     }
// }
