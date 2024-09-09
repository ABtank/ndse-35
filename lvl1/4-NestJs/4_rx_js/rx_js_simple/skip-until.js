const { interval, timer } = require('rxjs');
const { skipUntil } = require('rxjs/operators');

//emit every 1s
const source = interval(1000);
const example = source.pipe(
    skipUntil(timer(3000))
);
const subscribe = example.subscribe(val => console.log(val));