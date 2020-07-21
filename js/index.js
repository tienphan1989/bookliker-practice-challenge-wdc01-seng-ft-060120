document.addEventListener("DOMContentLoaded", start);

const URL = `http://localhost:3000/books`;

const fetchBooks = () => {
    fetch(URL)
    .then(resp => resp.json())
    .then(books => books.forEach(book => displayBook(book)))
    .catch(error => console.log(error))
}

const displayBook = (book) => {
    const ul = document.getElementById('list');
    let li = document.createElement('li');
    li.innerText = `${book.title}`;
    ul.appendChild(li);

    li.addEventListener('click', () => {
        featureBook(book);
    });
}

const featureBook = (book) => {
    const div = document.getElementById('show-panel');
    div.innerText = '';

    let img = document.createElement('img');
    img.src = book.img_url;

    let title = document.createElement('h3');
    let subtitle = document.createElement('h3');
    let author = document.createElement('h3');
    let description = document.createElement('p');
    let fanBase = document.createElement('ul');
    let button = document.createElement('button');
    button.addEventListener('click', () => {
        updateLikes(book, button)
    })

    title.innerText = book.title;
    subtitle.innerText = book.start;
    author.innerText = book.author;
    description.innerText = book.description;
    button.innerText = 'Click to Like';
    book.users.forEach((user) => {
        let fansLi = document.createElement('li');
        fansLi.innerText = user.username;
        fanBase.appendChild(fansLi);
    })

    div.append(img, title, subtitle, author, description, fanBase, button);
}

const updateLikes = (book, button) => {
    
    book.users.push({"id":1, "username":"pouros"});
    
    let bookData = {
        "users": book.users
    }

    fetch(`${URL}/${book.id}`, {
      method : 'PATCH',
      headers: {'content-type' : 'application/json', 'accept' : 'application/json'},
      body : JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(book => featureBook(book));
}

function start(){
    fetchBooks();
}

