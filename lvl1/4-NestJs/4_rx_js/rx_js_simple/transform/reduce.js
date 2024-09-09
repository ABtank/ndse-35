const { of } = require('rxjs');
const { reduce, scan, map, mapTo } = require('rxjs/operators');

const o = of(1, 2, 3, 4, 5, 6, 7).pipe(
    reduce((acc, current) => acc + current)
)

o.subscribe(console.log)

const o2 = of(1, 2, 3, 4, 5, 6, 7).pipe(
    scan((acc, current) => acc + current)
)

o2.subscribe(console.log)

const o3 = of(1, 2, 3, 4, 5, 6, 7).pipe(
    map(x => x * 2)
)

o3.subscribe(console.log);

const o4 = of(1, 2, 3, 4, 5, 6, 7).pipe(
    mapTo(11)
)

o4.subscribe(console.log);