const book_list = [];
const book_container = document.querySelector(".book-container");
const card_width = 230;
const form = document.querySelector("#edit-form");
const form_container = document.querySelector(".form-container");
const newBookButton = document.querySelector("#new-book");
let currentCard = null;
let currentBook = null;

const books = [
    ["Agnes Grey", "Anne Bronte", 1847, false, "agnesgrey"],
    ["The Idiot", "Fyodor Dostoevsky", 1891, true, "idiot"],
    ["The Iliad", "Homer", "600 BC", false, "iliad"],
    ["Jane Eyre", "Charlotte Bronte", 1921, true, "janeeyre"],
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

function displayThisBook(book) { // argument is a Book object; add card to its variables
    const card = document.createElement("div");
    card.classList.add("book-card");
    book_container.appendChild(card);
    card.id = book.id;
    card.style.width = `${card_width}px`;
    card.style.height = `${card_width*1.8}px`;

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
    read.innerHTML = `<b>Read</b>: ${(book.read) ? "yes" : "no"}`; 
    console.log("book.read: ", book.read);

    const actionsDiv = document.createElement("div");
    actionsDiv.innerHTML = `
        <a href="#" id="edit"><img src="icons/pencil.svg" alt="pencil icon"></a>
        <a href="#" id="delete"><img src="icons/delete.svg" alt="delete icon"></a>`;
    actionsDiv.classList.add("card-action");
    card.appendChild(actionsDiv);
}

function displayBooks() {
    for(let i = 0; i < book_list.length; i++) {
        displayThisBook(book_list[i]);
    }
}

function handleNewBook() {
    const new_form = document.createElement("form");
    new_form.id = "create-form";
    new_form.setAttribute("action", "#");
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
    form_container.appendChild(new_form);
}

function handleCreateBook(e) {

    const details = new FormData(e.target);
    const title = details.get("title");
    const author = details.get("author");
    const year = details.get("year");
    const read = details.get("read");
    console.log(read);

    createBook(title, author, year, read);

    displayThisBook(book_list.at(-1));
}

newBookButton.addEventListener("click", handleNewBook);

form_container.addEventListener("submit", (e) => {
    e.preventDefault();
    if(e.target.id === "create-form") {
        console.log("id:", e.target);
        
        handleCreateBook(e);
        e.target.remove();
        form.appendChild(newBookButton);
    }
});

document.addEventListener("click", (e) => {
    if(e.target.parentNode) {
        if(e.target.parentNode.id  === "edit") {
            if(form_container.querySelector("#new-form")) {
                let toRemove = form_container.querySelector("#new-form");
                form_container.removeChild(toRemove);
                toRemove.remove();
            }
            const new_form = document.createElement("form");
            new_form.id = "new-form";
            new_form.setAttribute("action", "#");
            new_form.classList.add("edit-card-form");

            const card = e.target.closest(".book-card");
            const book = book_list.find(book => book.id === card.id);
            currentCard = card;
            currentBook = book;
            new_form.innerHTML = `
                <label for="title">Title: </label>
                <input type="text" id="title" name="title" value="${book.title}">
                <label for="author">Author: </label>
                <input type="text" id="author" name="author" value="${book.author}">
                <label for="year">Year Published: </label>
                <input type="text" id="year" name="year" value="${book.year}">
                <label for="read">Read?</label>
                <select name="read" id="read">
                    <option value="true" ${book.read === true ? 'selected' : ''}>Yes</option>
                    <option value="false" ${book.read === false ? 'selected' : ''}>No</option>
                </select>
                <button id="submit-edit" type="submit">Save Edit</button>
            `;
            
        
            // form.removeChild(newBookButton);
            console.log("form:", form);
            console.log("new_form:", new_form);
            form_container.appendChild(new_form);
            form.removeChild(newBookButton);
        }
    }
});

document.addEventListener("click", (e) => {
    if(e.target.parentNode) {
        if(e.target.parentNode.id  === "delete") {
            const card = e.target.closest(".book-card");
            const book = book_list.find(book => book.id === card.id);

            card.remove();
        }
    }
});


document.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("ID",e.target.id);
    if(e.target.id === "new-form") {
        const details = new FormData(e.target);
        const title = details.get("title");
        const author = details.get("author");
        const year = details.get("year");
        const read = details.get("read");
        
        currentBook = {
            ...currentBook,
            ...{title, author, year, read}
        };

        const textContainer = currentCard.querySelector('.text-container');
        const p1 = textContainer.children[0];
        const p2 = textContainer.children[1];
        p1.innerHTML = `<b>Title</b>: ${title}
                        <br><b>Author</b>: ${author}
                        <br><b>Year published</b>: ${year}`;
        p2.innerHTML = `<b>Read</b>: ${(read === "true") ? "yes" : "no"}`;

        e.target.remove();
        form.appendChild(newBookButton);
    }
});