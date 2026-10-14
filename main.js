const bookForm = document.querySelector('.book-form');
const bookListTbody = document.querySelector('.book-list .book-table tbody');

bookForm.addEventListener('submit', addBook);

const titleBar = document.querySelector("#title");
const authorBar = document.querySelector("#author");
const isbnBar = document.querySelector("#isbn");

function addBook(e) {
  e.preventDefault();

  const title = titleBar.value;
  const author = authorBar.value;
  const isbn = isbnBar.value;

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