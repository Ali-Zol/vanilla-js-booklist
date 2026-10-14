const bookForm = document.querySelector('.book-form');

bookForm.addEventListener('submit', addBook);

function addBook(e) {
  e.preventDefault();

  const titleBar = document.querySelector("#title");
  const authorBar = document.querySelector("#author");
  const isbnBar = document.querySelector("#isbn");

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

  const bookListTbody = document.querySelector('.book-list .book-table tbody');

  bookListTbody.appendChild(newTr);
}