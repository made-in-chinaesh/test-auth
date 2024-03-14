import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Todo, TodoDocument } from './todos.schema'
import { Model, ObjectId } from 'mongoose'
import { EditTodoDto } from './dto/edit-todo.dto'

@Injectable()
export class TodosService {
	constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

	async create(dto: CreateTodoDto, userId: ObjectId) {
		try {
			const todo = await this.todoModel.create({
				...dto,
				userId,
			})
			await todo.save()
			return todo
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async delete(id: ObjectId) {
		try {
			return await this.todoModel.findByIdAndDelete(id)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async edit(dto: EditTodoDto, id: ObjectId) {
		try {
			const todo = await this.todoModel.findByIdAndUpdate(id, dto)
			todo.editedAt = new Date().toLocaleString()
			await todo.save()

			return todo
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async complete(id: ObjectId) {
		try {
			const todo = await this.todoModel.findById(id)
			if (!todo) {
				throw new HttpException('Todo not found', HttpStatus.NOT_FOUND)
			}

			todo.completed = !todo.completed
			await todo.save()
			return todo
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}

	async getTodos(userId: ObjectId) {
		try {
			return await this.todoModel.find({ userId })
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
		}
	}
}
