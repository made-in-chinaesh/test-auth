import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Todo, TodoSchema } from './todos.schema'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
		TokensModule,
	],
	providers: [TodosService],
	controllers: [TodosController],
	exports: [TodosService],
})
export class TodosModule {}
