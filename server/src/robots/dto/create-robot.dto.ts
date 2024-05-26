import {IsString} from "class-validator";

export class CreateRobotDto {
    @IsString()
    readonly serial_number: string;
}
