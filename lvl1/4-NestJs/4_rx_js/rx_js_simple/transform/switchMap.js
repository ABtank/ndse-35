const { of } = require('rxjs');
const { switchMap } = require('rxjs/operators');

const o = of(1, 2, 3, 4, 5, 6, 7).pipe(
    switchMap(x => of(x,x **2, x**3))
)

o.subscribe(x => console.log(x));