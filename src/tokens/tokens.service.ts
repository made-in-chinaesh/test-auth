import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokensService {
	constructor(private jwtService: JwtService) {}

	async generateToken(user) {
		const payload = { id: user._id, username: user.username }

		const accessToken = await this.createToken(payload, true)
		const refreshToken = await this.createToken(payload, false)

		return {
			accessToken,
			refreshToken,
		}
	}

	async createToken(payload, isAccessToken) {
		return await this.jwtService.signAsync(payload, {
			expiresIn: isAccessToken ? '15min' : '24h',
			secret: isAccessToken
				? process.env.ACCESS_TOKEN_SECRET
				: process.env.REFRESH_TOKEN_SECRET,
		})
	}

	async validateToken(token) {
		try {
			return await this.jwtService.verifyAsync(token, {
				secret: process.env.REFRESH_TOKEN_SECRET,
			})
		} catch (e) {
			console.log(e.message)
		}
	}
}
