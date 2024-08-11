// принцип открытости-закрытости
// классы, модули, функции - должны быть открыты для расширения, но закрыты для модификации

class BookOCP {
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

class ComicsBookOCP extends BookOCP {
    type: string;
    constructor(type: string, name: string, author: string) {
        super(name, author);  // <--- переиспользование конструктора
        this.type = type;
    }


    getInfo(): string {
        const bookInfo: string = super.getInfo(); // <--- переиспользование метода
        return `${bookInfo} - ${this.type}`;
    }
}
