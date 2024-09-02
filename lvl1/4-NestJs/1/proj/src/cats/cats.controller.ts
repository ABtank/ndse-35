import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cats.service';
import { Cat, CreateCatDto } from './interfaces/cat.interfaces';
import { Sphinx } from 'src/data/sphinx';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @Get()
  fildAll(): Promise<Cat[]> {
    const cat = new Sphinx();
    cat.name = 'Sphinx_name';
    this.catService.create(cat);
    return this.catService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    const cat = new Sphinx();
    cat.name = createCatDto.name || 'Post Sphinx_name';
    this.catService.create(createCatDto);
    this.catService.findAll();
  }
}
