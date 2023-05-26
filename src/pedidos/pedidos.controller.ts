import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedido')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    if (createPedidoDto.pedido_produtos.length < 1) {
      throw new BadRequestException('Pedido deve ter pelo menos um produto');
    }
    return this.pedidosService.create(createPedidoDto);
  }



}
