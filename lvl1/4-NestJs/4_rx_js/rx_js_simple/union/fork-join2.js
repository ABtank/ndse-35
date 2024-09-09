const { ajax } = require('rxjs/ajax');
const { of, forkJoin, map } = require('rxjs');

const google = of(ajax.getJSON('https://api.github.com/users/google'));
const microsoft = of(ajax.getJSON('https://api.github.com/users/microsoft'));
const users = of(ajax.getJSON('https://api.github.com/users'));

const fr = forkJoin({
    google: google,
    microsoft: microsoft,
    users: users
});

fr.subscribe(console.log);