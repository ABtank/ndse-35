const { range } = require('rxjs');
const { tap, map } = require('rxjs/operators');


const o = range(0,100)
    .pipe(
        tap(n => {
            console.log(`1: Получено значение ${n}`);
        }),
        map(n => n * 2),
        tap(n => {
            console.log(`2: Получено значение ${n}`);
        })
    );

o.subscribe(x => x);