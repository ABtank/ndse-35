const book: Book = {
    name: " Name",
    isbn: "1234",
    pagesCount: 12,
    hasHardCover: true
};

console.log(book)

const container = document.getElementById("content");
alert("hi");
console.log("sefsf");

if (container) {
    container.textContent = `Название книги: ${book.name}, ISBN: ${book.isbn}`;
}

// кортеж
let max: [number, string];
max = [4.5, "5.6"];
max = [4.6, "5.6"];

// Array
const arrNumber: number[] = [1, 2, 3];
const arrString: string[] = ['1', '2', '3'];
const arrString2: Array<string> = ['1', '2', '3'];
console.log(arrNumber,arrString,arrString2,max)

// Enum
enum Item { FETCHING, SUCCESS, FAILD };
// enum Item {
//     FETCHING = 0,
//     SUCCESS = 1,
//     FAILD = 2
// };
console.log(Item.FETCHING);

// Псевдонимы типов
// TypeScript позволяет определять псевдонимы типов
// с помощью ключевого слова type:
type StringOrNumberType  = number | string;
const sum: StringOrNumberType = 36.6;
if(typeof sum === "number"){
    console.log(sum/6);
}