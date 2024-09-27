import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
  tap,
} from "rxjs";
import axios from "axios";

@Injectable()
export class RxjsService {
  private hubs = {
    github: "https://api.github.com/search/repositories?q=",
    gitlab: "https://gitlab.com/api/v4/projects?search="
  }

  private get(url: string, text: string, count: number): Observable<any> {
    console.log(`${url}${text}`)
    return from(axios.get(`${url}${text}`))
      .pipe(
        tap(n => {
          // console.log(n.data);
        }),
        map((res: any) => Array.isArray(res.data) ? res.data : res.data.items),
        mergeAll(),
      )
      .pipe(take(count));
  }

  async search(text: string, hub: string): Promise<any> {
    console.log("hub = ", hub);
    if (this.hubs.hasOwnProperty(hub)) {
      console.log(`${hub} существует в hubs`);
      const data$ = this.get(this.hubs[hub], text, 10).pipe(toArray());
      data$.subscribe(() => { });
      return await firstValueFrom(data$);
    } else {
      console.log(`${hub} не существует в hubs`);
      throw new HttpException(`Хаб "${hub}" не существует`, HttpStatus.NOT_FOUND);
    }
  }

}
