// (new Promise(resolve => resolve(777)));
Promise.resolve(777)
    .then(value => {
        console.log(value);
        return 45;
    })
    .then(num => {
        console.log(num);
        return new Promise(resolve => { setTimeout(resolve, 200); });
    })
    .then(value => {

    })
    .then(value => {
        console.log(value); // undefined
    })