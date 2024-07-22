interface Book {
    name: string;
    isbn: string;
}

const book: Book = {
    name: " Name",
    isbn: "1234"
};

const container = document.getElementById("content");
alert("hi");
console.log("sefsf");

if (container) {
    container.textContent = `Название книги: ${book.name}, ISBN: ${book.isbn}`;
}