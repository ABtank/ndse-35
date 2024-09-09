
// класс для отмены http запроса
const controller = new AbortController();
const signal = controller.signal;

// срабатывает при вызове controller.abort()
signal.addEventListener('abort', ()=> console.log("aborted!"));

controller.abort();  // отмена!

console.log(signal.aborted);  // true

fetch('/start', {
    signal: controller.signal
});
