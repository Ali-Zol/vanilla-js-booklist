const bookForm = document.querySelector('.book-form');
const bookListTbody = document.querySelector('.book-list .book-table tbody');

bookForm.addEventListener('submit', addBook);

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

  clearMessage();

  titleBar.value = '';
  authorBar.value = '';
  isbnBar.value = '';

  const titleTd = document.createElement('td');
  const authorTd = document.createElement('td');
  const isbnTd = document.createElement('td');
  const deleteBtnTd = document.createElement('td');

  titleTd.textContent = title;
  authorTd.textContent = author;
  isbnTd.textContent = isbn;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'X';

  deleteBtnTd.appendChild(deleteBtn);

  const newTr = document.createElement('tr');
  newTr.appendChild(titleTd);
  newTr.appendChild(authorTd);
  newTr.appendChild(isbnTd);
  newTr.appendChild(deleteBtnTd);

  bookListTbody.appendChild(newTr);
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