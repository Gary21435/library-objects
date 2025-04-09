const book_list = [];
const book_container = document.querySelector(".book-container");
const card_width = 230;
const form = document.querySelector(".form");
const newBookButton = document.querySelector("#new-book");

const books = [
    ["Agnes Grey", "Anne Bronte", 1847, false, "agnesgrey"],
    ["The Idiot", "Fyodor Dostoevsky", 1891, false, "idiot"],
    ["The Iliad", "Homer", "600 BC", false, "iliad"],
    ["Jane Eyre", "Charlotte Bronte", 1921, false, "janeeyre"],
    ['The Adventures of Tom Sawyer', "Mark Twain", 1896, false, "sawyer"],
    ["The Prince", "Nicolo Machiavelli", 1532, false, "theprince"]
];

function Book(title, author, year, read, img_address) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
    if(img_address) this.img_address = `imgs/${img_address}.png`;
    else this.img_address = "imgs/iliad.png";
}

function createBook(title, author, year, read, img_address) {
    const new_book = new Book(title, author, year, read, img_address);
    book_list.push(new_book);
    new_book.id = crypto.randomUUID();
}

for(let i = 0; i < books.length-1; i++) {
    createBook(books[i][0], books[i][1], books[i][2], books[i][3], books[i][4]);
}

displayBooks();

function displayThisBook(book) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    book_container.appendChild(card);
    card.id = book.id;
    card.style.width = `${card_width}px`;
    card.style.height = `${card_width*1.72}px`;

    const img = document.createElement("img");
    img.src = book.img_address;
    img.style.width = "100%";
    img.style.height = "auto";
    card.appendChild(img);

    const textContainer = document.createElement("div");
    card.appendChild(textContainer);
    textContainer.classList.add("text-container");
    
    const text = document.createElement("p");
    textContainer.appendChild(text);
    text.innerHTML = `<b>Title</b>: ${book.title}
    <br><b>Author</b>: ${book.author}
    <br><b>Year published</b>: ${book.year}`;

    const read = document.createElement("p");
    textContainer.appendChild(read);
    read.innerHTML = `<b>Read</b>: ${(book.read === "true") ? "yes" : "no"}`;
    console.log("book.read: ", book.read);
}

function displayBooks() {
    for(let i = 0; i < book_list.length; i++) {
        displayThisBook(book_list[i]);
    }
}

function handleNewBook() {
    const new_form = document.createElement("div");
    new_form.innerHTML = `
        <label for="title">Title: </label>
        <input type="text" id="title" name="title">
        <label for="author">Author: </label>
        <input type="text" id="author" name="author">
        <label for="year">Year Published: </label>
        <input type="text" id="year" name="year">
        <label for="read">Read?</label>
        <select name="read" id="read" name="read">
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>
        <button id="submit" type="submit">Create Book</button>
    `;

    form.removeChild(newBookButton);
    form.appendChild(new_form);
}

function handleCreateBook(e) {

    const details = new FormData(e.target);
    const title = details.get("title");
    const author = details.get("author");
    const year = details.get("year");
    const read = details.get("read");
    console.log(read);

    const newBook = createBook(title, author, year, read);

    displayThisBook(book_list.at(-1));
}

newBookButton.addEventListener("click", handleNewBook);

document.addEventListener("submit", (e) => {
    e.preventDefault();
    handleCreateBook(e);
});