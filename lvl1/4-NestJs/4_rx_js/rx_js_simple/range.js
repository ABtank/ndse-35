const { range } = require('rxjs');
const { map } = require('rxjs/operators');

const observable = range(0, 10)
    .pipe(
        map(x => x ** 2)
    );

observable.subscribe(console.log);