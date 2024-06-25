import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {$Enums} from ".prisma/client";

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService
    ) {
    }
    async create({username, phoneNumber}: CreateUserDto) {
        const user = await this.prismaService.users.findFirst({
            where: {
                username: username,
                phone: phoneNumber
            }
        })
        if (user) {
            return user;
        }
        return this.prismaService.users.create({
            data: {
                username: username,
                phone: phoneNumber
            }
        })
    }
}
