import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';;


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserDetailByEmail(email);
        if (!user) {
            throw new BadRequestException();
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw new UnauthorizedException();
        }

        return user
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}