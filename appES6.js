class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI{
    validate(title, author, isbn){

        //Created an array to not repeating the code
        const validateArray = [title, author,isbn]
        let validate;

        validateArray.forEach(field => {
            if(field.value === '' ){
                field.classList.add('error');
                
                field.placeholder = 
                    `Please insert ${field.id.charAt(0) == 'a' ? 'an' : 'a'} ${field.id}`;
                validate = 1
            }else {
                field.classList.remove('error');
                field.placeholder = '';
            }
        });
        return validate;
    }

    addBookToList (book) {
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

    clearFields(title, author, isbn){
        title.value = '';
        author.value = '';
        isbn.value = '';
    
    }

    deleteBook(target){
        target.parentElement.parentElement.remove();
    }

    alertChange(className){
        const button = document.createElement('button');

        if(className ==='delete'){
            button.classList.add('removed');
            button.innerText = 'Successfuly removed';
        } else{
            button.classList.add('added');
            button.innerText = 'Successfuly added';
        }
        document.querySelector('.container').appendChild(button);

        setTimeout(()=>button.remove(), 4000)

        button.addEventListener('click',()=>button.remove())
    }
}

// Local Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book =>{
            const ui = new UI;

            ui.addBookToList(book)
        })

    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn) books.splice(index,1)
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}


document.addEventListener('DOMContentLoader', Store.displayBooks());

document.getElementById('book-form').addEventListener('submit', e =>{
    e.preventDefault();

    const title = document.getElementById('title'),
          author = document.getElementById('author'),
          isbn = document.getElementById('isbn');

    const ui = new UI();

    if(ui.validate(title,author,isbn) !== 1){
    
    const book  = new Book(title.value,author.value, isbn.value);

    Store.addBook(book);

    ui.addBookToList(book);

    ui.clearFields(title, author, isbn);

    ui.alertChange(e.target.className);
    };
})
document.getElementById('book-list').addEventListener('click', e => {
    const ui = new UI();
    if(e.target.className === 'delete'){ 
        ui.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.alertChange(e.target.className);
    }
    
})

