const { of, interval } = require('rxjs');
const { exhaustMap, switchMap, take, startWith } = require('rxjs/operators');

const o = interval(100)
    .pipe(
        exhaustMap(
            current => interval(500).pipe(
                startWith(current),
                take(10)
            )
        )
    );

o.subscribe(console.log);
