const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = myLibrary.length;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${!read ? "not read yet": "read"}`
    };

    addBookToLibrary(this);
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    myLibrary.forEach(displayBook);
}

const gridContainer = document.querySelector(".grid-container");
function displayBook(book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let cardIcon = document.createElement("div");
    cardIcon.classList.add("bookIcon");
    let cardContent = document.createElement("div");
    cardContent.classList.add("bookInfo");

    let title = document.createElement("p");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    let readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    if (book.read) {
        readBtn.classList.add("read");
    } else {
        readBtn.classList.add("unread");
    }

    title.innerText = book.title;
    author.innerText = `by ${book.author}`;
    pages.innerText = `${book.pages} pages`;
    read.innerText = `${!book.read ? "Not read yet": "Read"}`;
    deleteBtn.innerText = "Delete";
    readBtn.innerText = `${book.read ? "Mark as unread": "Mark as read"}`;

    deleteBtn.addEventListener("click", () => {
        delete myLibrary[book.index];
        displayLibrary();
    })

    readBtn.addEventListener("click", () => {
        book.toggleRead();
        displayLibrary();
    })

    title.classList.add("title");

    cardContent.appendChild(title);
    cardContent.appendChild(author);
    cardContent.appendChild(pages);
    cardContent.appendChild(read);
    cardContent.appendChild(deleteBtn);
    cardContent.appendChild(readBtn);

    bookCard.appendChild(cardContent);
    gridContainer.appendChild(bookCard);
}

const book1 = new Book("The Linux Command Line", "William Shotts", 555, true);
const book2 = new Book("Adventures with the Linux Command Line", "William Shotts", 263, false);
const book3 = new Book("Pro Git", "Scott Chacon and Ben Straub", 501, false);
const book4 = new Book("Warriors: Into The Wild", "Erin Hunter", 160, true);
const book5 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const book6 = new Book("50 Tips to improve User Interface", "Victor Ponamariov", 59, true);

displayLibrary();

const addBookModal = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-button");
const closeModalBtn = document.querySelector("dialog button");

addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
})

closeModalBtn.addEventListener("click", () => {
    addBookModal.close();
})

const newTitle = document.querySelector("#new-title");
const newAuthor = document.querySelector("#new-author");
const newPages = document.querySelector("#new-pages");
const newBookBtn = document.querySelector("#add-book-btn");

newBookBtn.addEventListener("click", () => {
    event.preventDefault();

    title = newTitle.value;
    author = newAuthor.value;
    pages = newPages.value;
    // read = newRead.value;
    read = document.querySelector('input[name="read-status"]:checked').value;

    if (checkFormValidity()) {
        resetFormFields();
        addBookModal.close();
        newBook = new Book(title, author, pages, read);
        displayBook(newBook);
    } else {
        alert("Form invalid");
    }
})

function checkFormValidity() {
    if (
        newTitle.checkValidity() &&
        newAuthor.checkValidity() &&
        newPages.checkValidity()
    ) {
        return true;
    } else {
        return false;
    }
}

function resetFormFields() {
    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
}

const refreshBtn = document.querySelector(".refresh-button");
refreshBtn.addEventListener("click", displayLibrary())
