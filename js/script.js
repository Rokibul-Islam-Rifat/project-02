//Get UI Element
let form = document.querySelector('#book-form');
let bookList = document.querySelector('#book-list');


//Book class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    static addToBookList(book){
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }
    static clearList(){
        document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className){ 
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },3000)
    }

    static deleteFormBook(target){
        // console.log(target)
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            //console.log(target.parentElement.previousElementSibling.textContent.trim());
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Remove Book !", "success");
        }
    }

}


//Local Storage class
class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getbooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static displayBooks(){
        let books = Store.getbooks();

        books.forEach(book =>{
            UI.addToBookList(book);
        })
    }
    static removeBook(isbn){
        let books = Store.getbooks();
        books.forEach((book, index) =>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}




//Add Event lisintener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());

//Define function
function newBook(e){
    let title = document.querySelector('#title').value
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;
    if(title === '' || author === '' || isbn === ''){
        // alert('Please Fill All The Fields !');
        UI.showAlert("Please Fill All The Fields","error")
    }else{
        let book = new Book(title, author, isbn);
        UI.addToBookList(book);
        UI.clearList();
        UI.showAlert("Book Add !", "success");
        Store.addBook(book);
    }
    e.preventDefault();
}

function removeBook(e){
    UI.deleteFormBook(e.target);
    e.preventDefault();
}