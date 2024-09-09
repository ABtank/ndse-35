const { from } = require('rxjs');
const { map } = require('rxjs/operators');

const observable = from(['Ольга', 'Елизавета', 'Олеся']);

observable
    .pipe(
        map(name => name + ' Романова')
    )
    .subscribe(console.log);