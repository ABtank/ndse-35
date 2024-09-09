const { range } = require('rxjs');

const o = range(0,100);
const p = o.toPromise();

p.then(console.log);