import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CalcService } from './calc.service';
import { CalcDto } from './calc.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Post()
  calculate(@Body() calcDto: CalcDto, @Res() res: Response) {
    const result = this.calcService.calculateExpression(calcDto);
    if ('statusCode' in result) {
      return res.status(result.statusCode).json(result);
    }
    return res.status(HttpStatus.CREATED).json(result);
  }
}
