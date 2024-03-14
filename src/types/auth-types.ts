import * as mongoose from 'mongoose'

export interface IAuth {
	_id: mongoose.Schema.Types.ObjectId
	username: string
	accessToken: string
	refreshToken: string
}
