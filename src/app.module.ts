import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'
import { TokensModule } from './tokens/tokens.module'

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		MongooseModule.forRoot(process.env.MONGO_DB),
		TodosModule,
		AuthModule,
		TokensModule,
	],
})
export class AppModule {}
