const bookForm = document.querySelector('.book-form');
const bookListTbody = document.querySelector('.book-list .book-table tbody');

let books = [];

bookForm.addEventListener('submit', addBook);
bookListTbody.addEventListener('click', deleteBook);

const titleBar = document.querySelector("#title");
const authorBar = document.querySelector("#author");
const isbnBar = document.querySelector("#isbn");
const msg = document.querySelector('.msg');
let msgTimerId = 0;

function addBook(e) {
  e.preventDefault();

  const title = titleBar.value.trim();
  const author = authorBar.value.trim();
  const isbn = isbnBar.value.trim();

  if(title === '' || author === '' || isbn === '') {
    showMessage('Please enter all fields.');
    return;
  }

  if (!/^\d{13}$/.test(isbn)) {
    showMessage('ISBN must be exactly 13 digits.');
    return;
  }

  if(books.some(b => b.isbn === isbn)) {
    showMessage('This ISBN already exists.');
    return;
  }

  clearMessage();

  titleBar.value = '';
  authorBar.value = '';
  isbnBar.value = '';

  const book = {title, author, isbn};
  books.push(book);

  saveBooks();
  renderBooks();
}

function showMessage(textContent) {
  msg.classList.add('error');
  msg.textContent = textContent;
  clearTimeout(msgTimerId);

  msgTimerId = setTimeout(() => {
    msg.textContent = '';
    msg.classList.remove('error');
  }, 3000);
}

function clearMessage() {
  msg.textContent = '';
  msg.classList.remove('error');
  clearTimeout(msgTimerId);
}

function deleteBook(e) {
  if(!e.target.closest('.delete-btn'))
    return;

  const tr = e.target.closest('tr');
  
  if(tr) {
    if(!confirm('Are you sure you want to delete this book?'))
      return;
    
    const isbnToDelete = tr.children[2].textContent;
    
    books = books.filter(b => b.isbn !== isbnToDelete);

    saveBooks();
    renderBooks();
  }
}

function loadBooks() {
  return JSON.parse(localStorage.getItem('books')) || [];
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function renderBooks() {
  bookListTbody.innerHTML = '';

  books.forEach(b => {
    const titleTd = document.createElement('td');
    const authorTd = document.createElement('td');
    const isbnTd = document.createElement('td');
    
    titleTd.textContent = b.title;
    authorTd.textContent = b.author;
    isbnTd.textContent = b.isbn;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    
    const deleteBtnTd = document.createElement('td');
    deleteBtnTd.appendChild(deleteBtn);

    const newTr = document.createElement('tr');
    newTr.appendChild(titleTd);
    newTr.appendChild(authorTd);
    newTr.appendChild(isbnTd);
    newTr.appendChild(deleteBtnTd);

    bookListTbody.appendChild(newTr);
  });
}

books = loadBooks();
renderBooks();