function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML += `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"> X </a> </td>
    `;

    list.appendChild(row)
}
UI.prototype.clearFields = function(title, author, isbn){
    title.value = '';
    author.value = '';
    isbn.value = '';

}

UI.prototype.validate = function (title, author, isbn){
let validate;
    if(title.value === '' ){
        title.classList.add('error');
        title.placeholder = 'Please insert a Title';
        validate = 1
    }else {
        title.classList.remove('error');
        title.placeholder = '';
    }
    if(author.value === '' ){
        author.classList.add('error');
        author.placeholder = 'Please insert an Author';
        validate = 1
    }else {
        author.classList.remove('error');
        author.placeholder = '';
    }
    if(isbn.value === '' ){
        isbn.classList.add('error');
        isbn.placeholder = 'Please insert an ISBN';
        validate = 1
    }else {
        isbn.classList.remove('error');
        isbn.placeholder = '';
    }

    return validate;
}

UI.prototype.deleteBook = function (target){
    target.parentElement.parentElement.remove();
}

    


document.getElementById('book-form').addEventListener('submit', e =>{
    e.preventDefault();

    const title = document.getElementById('title'),
          author = document.getElementById('author'),
          isbn = document.getElementById('isbn');

    const ui = new UI();

    if(ui.validate(title,author,isbn) !== 1){
    const book  = new Book(title.value,author.value, isbn.value);

    

    ui.addBookToList(book);

    ui.clearFields(title, author, isbn);
    }




})
document.getElementById('book-list').addEventListener('click', e => {
    const ui = new UI();
    if(e.target.className === 'delete') ui.deleteBook(e.target);
})
