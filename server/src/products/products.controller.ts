import {Body, Controller, Get, Post, Query, Res} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {createReadStream} from 'fs'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Get('all')
    async getAllProducts() {
        return this.productsService.getAllProducts();
        }

        //@Post()
        // async create(@Body() dto:CreateProductDto){
        //     return this.productsService.create(dto)
        // }

}
