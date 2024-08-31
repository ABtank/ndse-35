import { Controller, Get } from '@nestjs/common';
import { CatService } from './cats.service';
import { Cat } from './interfaces/cat.interfaces';
import { Sphinx } from 'src/data/sphinx';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @Get()
  fildAll(): Cat[] {
    const cat = new Sphinx();
    cat.name = 'Sphinx_name';
    this.catService.create(cat);
    return this.catService.findAll();
  }
}
