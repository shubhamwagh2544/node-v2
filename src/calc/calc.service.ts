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

  private evaluateExpression(expression: string): number {
    const numberStack: number[] = [];
    const operatorStack: string[] = [];
    let num = '';

    function executeOperation() {
      const b = numberStack.pop();
      const a = numberStack.pop();
      const op = operatorStack.pop();
      if (a === undefined || b === undefined || op === undefined) {
        throw new Error('Invalid expression');
      }
      switch (op) {
        case '+':
          numberStack.push(a + b);
          break;
        case '-':
          numberStack.push(a - b);
          break;
        case '*':
          numberStack.push(a * b);
          break;
        case '/':
          if (b === 0) throw new Error('Division by zero');
          numberStack.push(Math.trunc(a / b));
          break;
        default:
          throw new Error('Invalid operator');
      }
    };

    function operatorPrecedence(op: string) {
      if (op === '+' || op === '-') return 1;
      if (op === '*' || op === '/') return 2;
      return 0;
    };

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(Number(char))) {
        num += char;
      }
      else if (char === '+' || char === '-' || char === '*' || char === '/') {
        if (num) {
          numberStack.push(Number(num));
          num = '';
        }
        while (operatorStack.length && operatorPrecedence(operatorStack[operatorStack.length - 1]) >= operatorPrecedence(char)) {
          executeOperation();
        }
        operatorStack.push(char);
      }
      else {
        throw new Error('Invalid character');
      }
    }

    if (num) {
      numberStack.push(Number(num));
    }

    while (operatorStack.length) {
      executeOperation();
    }

    if (numberStack.length !== 1) {
      throw new Error('Invalid expression');
    }

    return numberStack[0];
  }
}
