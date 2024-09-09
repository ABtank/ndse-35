const { interval } = require('rxjs');
const { skipWhile } = require('rxjs/operators');

const source = interval(1000);
const example = source.pipe(
    skipWhile(val => val < 5)
);

const subscribe = example.subscribe(val => console.log(val));