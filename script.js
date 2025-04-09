const book_list = [];
const book_container = document.querySelector(".book-container");

function Book(title, author, page_count, year, img_address) {
    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.year = year;
    this.img_address = `imgs/${img_address}.png`;
}

function createBook(title, author, page_count, year, img_address) {
    const new_book = new Book(title, author, page_count, year, img_address);
    book_list.push(new_book);
    new_book.id = crypto.randomUUID();
}

const book1 = createBook("Agnes Grey", "Anne Bronte", "240", 1847, "agnesgrey");

function displayBooks() {
    for(let i = 0; i < book_list.length; i++) {
        const book = book_list[i];
        const card = document.createElement("div");
        card.classList.add("book-card");
        book_container.appendChild(card);
        card.id = book.id;
        card.style.width = "300px"
        card.style.height = "480px";


        const img = document.createElement("img");
        img.src = book.img_address;
        img.style.width = "100%";
        img.style.height = "auto";
        card.appendChild(img);

        const text = document.createElement("p");
        text.textContent = `${book.title} by ${book.author}, ${book.year}, ${book.page_count} pages.`;
    }
}

displayBooks();

// create 'cards' for the books 
