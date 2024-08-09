interface PrintedItem {
    name: string;
    isbn: string;
    pagesCount: number;
    hasHardCover: boolean;
}

class Book implements PrintedItem {
    name!: string;
    isbn!: string;
    pagesCount!: number;
    hasHardCover = true;
}

class ComicsBook implements PrintedItem {
    name!: string;
    isbn!: string;
    pagesCount!: number;
    hasHardCover = false;
}

const book1: Book = {
    name: "string",
    isbn: "string",
    pagesCount: 12,
    hasHardCover : false
}

console.log(book1)

const book2: ComicsBook = {
    name: "string",
    isbn: "string",
    pagesCount: 12,
    hasHardCover : false
}

console.log(book2)

// Интерфейс функции
interface FullNameBuilder {
    (name: string, surname: string): string;
}

const simpleBuilder: FullNameBuilder = function (name: string, surname: string): string{
    return `Mr. ${name} ${surname}`
}

const fullName = simpleBuilder("Bob", "Sompson");
console.log(fullName)