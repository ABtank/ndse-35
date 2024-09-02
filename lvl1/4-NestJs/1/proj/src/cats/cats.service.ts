import { Injectable, Inject, forwardRef, Scope } from '@nestjs/common';
import { Cat } from './interfaces/cat.interfaces';
import { CommonService } from './common.service';

@Injectable({
  scope: Scope.DEFAULT,
})
export class CatService {
  constructor(
    //обход циклической зависимости
    @Inject(forwardRef(() => CommonService))
    private readonly commonService: CommonService,
  ) {}

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Promise<Cat[]> {
    return Promise.resolve(this.cats);
  }
}
