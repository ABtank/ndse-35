const {from, zip} = require('rxjs');

const productivityOne = [1,2,3,1,4,0,1];
const productivityTwo = [2,5,2,4,5,1,5];
const s1 = from(productivityOne);
const s2 = from(productivityTwo);


const z = zip(s1, s2);

z.subscribe(console.log);