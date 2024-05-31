import { Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    const expression = calcBody.expression;
    try {
      const result = this.evaluateExpression(expression);
      return { result };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Bad Request',
      };
    }
  }
}
