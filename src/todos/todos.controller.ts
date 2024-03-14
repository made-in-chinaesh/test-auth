import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
} from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Todo } from './todos.schema'
import { ObjectId } from 'mongoose'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { EditTodoDto } from './dto/edit-todo.dto'
import { ValidationPipe } from '../pipes/validation.pipe'

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
	constructor(private todoService: TodosService) {}

	@ApiOperation({ summary: 'For create todo' })
	@ApiResponse({ status: 200, type: Todo })
	@UseGuards(JwtAuthGuard)
	@Post('/create/:id')
	create(
		@Body(new ValidationPipe()) dto: CreateTodoDto,
		@Param('id') userId: ObjectId
	) {
		return this.todoService.create(dto, userId)
	}

	@ApiOperation({ summary: 'For delete todo' })
	@ApiResponse({ status: 200, type: Todo })
	@UseGuards(JwtAuthGuard)
	@Delete('/delete/:id')
	delete(@Param('id') id: ObjectId) {
		return this.todoService.delete(id)
	}

	@ApiOperation({ summary: 'For edit todo' })
	@ApiResponse({ status: 200, type: Todo })
	@UseGuards(JwtAuthGuard)
	@Put('/edit/:id')
	edit(@Body() dto: EditTodoDto, @Param('id') id: ObjectId) {
		return this.todoService.edit(dto, id)
	}

	@ApiOperation({ summary: 'For complete todo' })
	@ApiResponse({ status: 200, type: Todo })
	@UseGuards(JwtAuthGuard)
	@Post('/complete/:id')
	complete(@Param('id') id: ObjectId) {
		return this.todoService.complete(id)
	}

	@ApiOperation({ summary: 'Get User Todos' })
	@ApiResponse({ status: 200, type: [Todo] })
	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	getTodos(@Param('id') userId: ObjectId) {
		return this.todoService.getTodos(userId)
	}
}
