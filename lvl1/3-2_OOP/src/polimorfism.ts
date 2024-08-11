// v1

class HumanWorker {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    doWork(): void {
        console.log("some work");
    }
}

class Lumberjack extends HumanWorker {
    doWork(): void {
        console.log(`${this.name} Рублю лес`);
    }
}

class Hunter extends HumanWorker {
    doWork(): void {
        console.log(`${this.name} Охочусь`);
    }
}


const worker1 = new Hunter("Охотник Вася");
const worker2 = new Lumberjack("Лесоруб Петя");

worker1.doWork();
worker2.doWork();




// v2

class BookRel {
    name: string;
    author: string;

    constructor(name: string, author: string) {
        this.name = name;
        this.author = author;
    }

    getInfo(): string {
        return `${this.name} - ${this.author}`;
    }
}

class ComicsBookRel extends BookRel {
    type: string;

    // переопределение конструктора  super
    constructor(type: string, name: string, author: string) {
        super(name, author);
        this.type = type;
    }

    // переопределение метода super
    getInfo(): string {
        const bookInfo: string = super.getInfo();
        return `${bookInfo} - ${this.type}`;
    }
}

const bookRel = new BookRel("name", "author");
const comicsBookRel = new ComicsBookRel("type", "name", "author");

console.log(bookRel.getInfo());
console.log(comicsBookRel.getInfo());



// перегрузка

function sum(a: number): number;
function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;

function sum(a: number, b?: number, c?: number): number {
    let sum: number = a;
    if (b) sum += b;
    if (c) sum += c;
    return sum;
}

// function sum(a: number, b: number = 0, c: number = 0): number {
//     return a + b + c;
// }

console.log(sum(2));
console.log(sum(2, 3));
console.log(sum(2, 4, 5));