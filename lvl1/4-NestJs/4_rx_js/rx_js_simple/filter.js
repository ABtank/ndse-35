const { range } = require('rxjs');
const { map, filter } = require('rxjs/operators');

const observable = range(0, 10)
    .pipe(
        map(x => x ** 2),
        filter(x => x > 50)
    );

observable.subscribe(console.log);