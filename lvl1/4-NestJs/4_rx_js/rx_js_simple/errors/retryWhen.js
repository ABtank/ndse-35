const { of, interval } = require('rxjs');
const { switchMap, retryWhen, throwError, delay } = require('rxjs/operators');

const o = interval(1000).pipe(
    switchMap(val => {
        if(val > 3) {
            return throwError('Error > 3!');
        }
        return of(val);
    }),
    retryWhen(errorObservable =>
        errorObservable.pipe(
            delay(3000)
        )
    )
);