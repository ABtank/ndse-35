import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatService } from './cats.service';
import { CommonService } from './common.service';

@Module({
  //обход циклической зависимости в модуле
  // imports:[forwardRef(() => CommonModule)],
  controllers: [CatsController],
  providers: [CatService, CommonService],
  exports: [CatService],
})
export class CatsModule {}
