import { Controller, Get, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { getEnvironmentData } from 'worker_threads';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) { }

  @Get()

  async getHello(@Body() body: any): Promise<object> {


    return this.appService.getHello();
  }
}
