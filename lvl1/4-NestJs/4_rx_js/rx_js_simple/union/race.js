const { timer, race, of } = require('rxjs');
const { delay, take } = require('rxjs/operators');

const o1 = of(7,11,55).pipe(delay(100));
const timerOne = timer(1000, 4000).pipe(take(7));
const timerTwo = timer(2000, 4000).pipe(take(2));
const timerThree = timer(3000, 4000).pipe(take(4));
const o = race(o1, timerOne, timerTwo, timerThree);

o.subscribe(console.log);