import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateTodoDto {
	@ApiProperty({ example: 'Hello', description: 'Title for todo' })
	@IsString({ message: 'Must be a string' })
	@Length(3, 20)
	readonly title: string

	@ApiProperty({
		example: 'Lorem ipsum dolor',
		description: 'Description for todo',
	})
	@IsString({ message: 'Must be a string' })
	description: string
}
