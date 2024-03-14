import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@ApiProperty({ example: 'execs', description: 'Username' })
	@Prop({ type: String, unique: true })
	username: string

	@ApiProperty({ example: '123123', description: 'Password' })
	@Prop()
	password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
