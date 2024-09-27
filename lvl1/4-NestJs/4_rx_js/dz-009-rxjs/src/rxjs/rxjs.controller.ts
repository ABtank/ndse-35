import { Controller, Get, Query } from "@nestjs/common";
import { RxjsService } from "./rxjs.service";
import { IParamText } from "./interfaces/text-param";

@Controller("rxjs")
export class RxjsController {
  constructor(private rxjsService: RxjsService) { }

  @Get("repositories/")
  async repositories(@Query() { search, hub }: IParamText) {
    console.log('repositories search', search)
    return await this.rxjsService.search(search, hub || "github");
  }

  @Get("projects/")
  async projects(@Query() { search, hub }: IParamText) {
    console.log('projects search', search)
    return await this.rxjsService.search(search, hub || "gitlab");
  }
}
