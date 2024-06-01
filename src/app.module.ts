import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CalcModule } from './calc/calc.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [CalcModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
