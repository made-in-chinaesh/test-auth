import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ example: 'exec', description: 'Username' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 10, {
		message: 'At least 3 characters and no more than 10 characters',
	})
	readonly username: string

	@ApiProperty({ example: '123dev', description: 'Password' })
	@IsString({ message: 'Must be a string' })
	@Length(4, 8, {
		message: 'At least 4 characters and no more than 8 characters',
	})
	readonly password: string
}
