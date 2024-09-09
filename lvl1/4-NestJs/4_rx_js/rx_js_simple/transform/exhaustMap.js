const { of, interval } = require('rxjs');
const { exhaustMap, switchMap } = require('rxjs/operators');

const o = of(20, 30, 40)
    .pipe(
        exhaustMap(
            x => of(x+5, x+7, x+8)
        )
    );

o.subscribe(console.log);