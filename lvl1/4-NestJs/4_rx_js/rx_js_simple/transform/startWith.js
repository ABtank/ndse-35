const { of } = require('rxjs');
const { startWith } = require('rxjs/operators');

of(1, 2, 3).pipe(
    startWith(0)
)
.subscribe(console.log);