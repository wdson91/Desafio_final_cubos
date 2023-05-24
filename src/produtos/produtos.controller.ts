import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { UserId } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('produto')

export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) { }

  @Post()
  create(@UserId() id: number, @Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll(@Query('categoria_id') id: number) {
    return this.produtosService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.produtosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {

    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
