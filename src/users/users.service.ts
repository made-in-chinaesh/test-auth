import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './users.schema'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createUser(dto: CreateUserDto) {
		try {
			return await this.userModel.create(dto)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async findUserByUsername(username: string) {
		const user = await this.userModel.findOne({ username })
		return user
	}
}
