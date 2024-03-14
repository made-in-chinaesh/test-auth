import { ApiProperty } from '@nestjs/swagger'

export class EditTodoDto {
	@ApiProperty({ example: 'News', description: 'Title for todo' })
	title: string

	@ApiProperty({
		example: 'Lorem ipsum dolor wa fo sila',
		description: 'Description for todo',
	})
	description: string
}
