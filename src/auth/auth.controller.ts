import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/users.schema'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Login' })
	@ApiResponse({ status: 200, type: User })
	@Post('/login')
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto)
	}

	@ApiOperation({ summary: 'Registration' })
	@ApiResponse({ status: 200, type: User })
	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto)
	}

	@ApiOperation({ summary: 'Refresh' })
	@ApiResponse({ status: 200, type: User })
	@Post('/refresh')
	refresh(@Body() refreshToken: string) {
		return this.authService.refresh(refreshToken)
	}
}
