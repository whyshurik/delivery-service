import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }
    async getAllProducts() {
        return this.prismaService.products.findMany();
    }
}
