import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthenticatedUser } from 'src/common/interfaces/user.interface';

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    @UsePipes(ValidationPipe)
    public createUser(
        @Body() registerUserDto: RegisterUserDto
    ) {
        return this.usersService.registerUser(registerUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    public getUserProfile(@Request() req) {
        console.log('req', req.user)
        return this.usersService.getUserProfile(req.user)
        // return this.usersService.getUserProfile(user)
    }

}
