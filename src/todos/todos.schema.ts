import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type TodoDocument = HydratedDocument<Todo>

@Schema()
export class Todo {
	@ApiProperty({ example: '1k2h4g5c6k5c90hf', description: 'UserId for todo' })
	@Prop({ type: mongoose.Schema.Types.ObjectId })
	userId: string

	@ApiProperty({ example: 'Sport', description: 'Title' })
	@Prop()
	title: string

	@ApiProperty({ example: 'Lorem ipsum dolor', description: 'Description' })
	@Prop({ type: String, default: '' })
	description: string

	@ApiProperty({ example: 'true', description: 'Completed todo or no' })
	@Prop({ type: Boolean, default: false })
	completed: boolean

	@ApiProperty({ example: '11.22.16:21', description: 'Created date todo' })
	@Prop({ type: String, default: new Date().toLocaleString() })
	createdAt: string

	@ApiProperty({ example: '11.22.16:21', description: 'Edited date todo' })
	@Prop({ type: String, default: false })
	editedAt: string
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
