const { of, fromEvent, interval } = require('rxjs');
const { switchMap } = require('rxjs/operators');

// const clicks = fromEvent(document, 'click');
// const o = clicks.pipe(
//     switchMap(() => interval(1000))
// )


const o2 = interval(2500).pipe(
    switchMap(() => interval(1000))
)

o2.subscribe(console.log);