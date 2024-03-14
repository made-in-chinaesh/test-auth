import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { TokensService } from '../tokens/tokens.service'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private tokenService: TokensService
	) {}

	async login(userDto: CreateUserDto) {
		try {
			const user = await this.validateUser(userDto)

			const tokens = await this.tokenService.generateToken(user)

			return {
				_id: user._id,
				username: user.username,
				...tokens,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async registration(userDto: CreateUserDto) {
		try {
			const candidate = await this.userService.findUserByUsername(
				userDto.username
			)

			if (candidate) {
				throw new HttpException(
					'Username is already exists',
					HttpStatus.BAD_REQUEST
				)
			}

			const hashPassword = await bcrypt.hash(userDto.password, 5)

			const user = await this.userService.createUser({
				...userDto,
				password: hashPassword,
			})

			const tokens = await this.tokenService.generateToken(user)

			return {
				_id: user._id,
				username: user.username,
				...tokens,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async refresh(dto) {
		try {
			const validate = await this.tokenService.validateToken(dto.refreshToken)

			if (!validate) {
				throw new HttpException('Wrong token', HttpStatus.BAD_REQUEST)
			}

			const payload = { id: validate.id, username: validate.username }

			return await this.tokenService.generateToken(payload)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.findUserByUsername(userDto.username)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)

		if (user && passwordEquals) {
			return user
		}

		throw new HttpException(
			'Wrong username or password',
			HttpStatus.BAD_REQUEST
		)
	}
}
