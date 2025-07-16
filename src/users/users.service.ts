import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }
    public async registerUser(registerUserRequest: RegisterUserDto) {
        const { password } = registerUserRequest
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        return this.prismaService.user.create({
            data: {
                ...registerUserRequest,
                password: hashedPassword
            }
        })
    }

    public async getUserDetailByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: { email }
        });
    }

    public async getUserProfile(user: any) {
        const response = await this.getUserDetailByEmail(user.email)
        return {
            id: response?.id,
            email: response?.email,
            name: response?.name
        }
    }
}
