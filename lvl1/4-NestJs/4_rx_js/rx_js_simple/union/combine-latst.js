const {timer, combineLatest} = require('rxjs');
const { take } = require('rxjs/operators');

const timerOne = timer(0,4000).pipe(take(3));
const timerTwo = timer(2000,4000).pipe(take(3));
const timerThree = timer(3000,4000).pipe(take(3));
const o = combineLatest(timerOne, timerTwo, timerThree);

o.subscribe(console.log);