import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CatService } from './cats.service';

@Injectable()
export class CommonService {
  constructor(
    //обход циклической зависимости
    @Inject(forwardRef(() => CatService))
    private readonly catService: CatService,
  ) {}
}
