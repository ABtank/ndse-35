const { timer } = require('rxjs');

const observable = timer(0, 500);
observable.subscribe(console.log);
