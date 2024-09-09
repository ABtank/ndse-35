const { timer, merge } = require('rxjs');
const { take } = require('rxjs/operators');

const timerOne = timer(0, 4000).pipe(take(7));
const timerTwo = timer(2000, 4000).pipe(take(2));
const timerThree = timer(3000, 4000).pipe(take(4));
const o = merge(timerOne, timerTwo, timerThree);

o.subscribe(console.log);