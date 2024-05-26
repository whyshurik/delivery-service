import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { RobotsModule } from './robots/robots.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      OrdersModule,
    RobotsModule,
    ProductsModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  providers: [ProductsService],
})
export class AppModule {}
