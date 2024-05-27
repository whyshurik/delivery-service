import {IsInt} from "class-validator";
import {IsJsonWithFields} from "../is-json-with-fields.decorator";

export class CreateOrderDto {

    @IsJsonWithFields()
    readonly products: Array<{ productId: number; quantity: number }>;

    @IsInt()
    readonly user_id: number;

}

