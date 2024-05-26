import {IsInt} from "class-validator";

export class CreateOrderDto {

    @IsInt()
    readonly product_id: number;

    @IsInt()
    readonly user_id: number;

    @IsInt()
    readonly robot_id: number;
}

