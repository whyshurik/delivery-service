import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import {RobotsService} from "../robots/robots.service";
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
