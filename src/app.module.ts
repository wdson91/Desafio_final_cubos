import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { MulterModule } from '@nestjs/platform-express';


import { PedidosModule } from './pedidos/pedidos.module';
import * as B2 from 'backblaze-b2';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './global-exception.filter';





@Module({
  imports: [AuthModule, MulterModule.register({
    dest: '../uploads', // Define o diretório de armazenamento dos arquivos
  }), UsersModule, ProdutosModule, ClientesModule, PedidosModule, ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }),],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService, {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },],
})
export class AppModule { }
