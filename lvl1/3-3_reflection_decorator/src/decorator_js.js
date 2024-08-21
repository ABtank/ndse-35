

// декоратор 1
// логирование
function withLog(fn) {

    // замыкание
    return function (...args) {
        console.log(`invoked function: ${fn.name}`)
        return fn(...args);
    }
}

function sum(x, y) {
    return x + y;
}

const loggedSum = withLog(sum);

const result = loggedSum(3, 5);

console.log(result);
console.log(withLog(sum)(2,4));


// декоратор 2
// функция кеширования через замыкание

function slow(x) {

    console.log(`типа долгое вычисление ${x}`);
    return x;
}

function withCache(func) {
    let cache = new Map();
    return function (x) {
        if (!cache.has(x)) {
            console.log("первый раз считаем")
            let result = func(x);
            cache.set(x, result);
        } else {
            console.log("берем из кеша")
        }

        return cache.get(x)
    }
}

const cachedSlow = withCache(slow);

console.log(cachedSlow(6))
console.log(cachedSlow(6))



// декоратор 3
// делает шаблон верстки
const withLayout = function (render) {
    return function (...args) {
        const content = render(...args);
        return `
        <header>Верхняя часть сайта</header>
        <main>${content}</main>
        <footer>Нижняя часть сайта</footer>
        `
    }
}

const Contacts = function(phone, email){
    return `
    <address>Email: ${email}, Phone: ${phone}</address>
    `;
};

const ContactsPage = withLayout(Contacts);

const user1contactsPage = ContactsPage("+723422","email1@sd.df");
const user2contactsPage = ContactsPage("+75466423422","email2@sd.df");

console.log(user1contactsPage);
console.log(user2contactsPage);