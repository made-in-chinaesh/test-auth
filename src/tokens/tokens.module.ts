import { forwardRef, Module } from '@nestjs/common'
import { TokensService } from './tokens.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { TodosModule } from '../todos/todos.module'

@Module({
	imports: [JwtModule.register({})],
	providers: [TokensService],
	exports: [TokensService, JwtModule],
})
export class TokensModule {}
