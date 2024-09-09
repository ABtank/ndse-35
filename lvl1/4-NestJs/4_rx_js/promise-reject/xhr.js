const xhr = new XMLHttpRequest;

xhr.addEventListener('load', e => {
    console.log(e);
});

xhr.open('GET','/start');

xhr.send();

xhr.abort();