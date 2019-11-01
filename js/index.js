const BOOKS_URL = 'http://localhost:3000/books'
document.addEventListener("DOMContentLoaded", function() {
  fetchBooks();
});

function fetchBooks() {
  fetch(BOOKS_URL)
  .then(res => {
    return res.json();
  })
  .then(json => {
    const booksArr = json;
    displayBooks(booksArr);
  })
}

function displayBooks(booksArr) {
  let list = document.getElementById('list');
  let showPanel = document.getElementById('show-panel');
  for (const book of booksArr) {
    let li = document.createElement('li');
    li.textContent = book.title;
    let title = document.createElement('h2');
    
    let img = document.createElement('img');
    let p = document.createElement('p');
    let usersList = document.createElement('ul')
    let user = document.createElement('li');
    let likeButton = document.createElement('button');
    likeButton.textContent = 'gobblin goblins'

    likeButton.addEventListener('click', () => {
      fetch(BOOKS_URL + '/' + book.id, {
        method: 'PATCH',
        headers: 
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
          'users': book.users.push({id: 1, username: 'pouros'})
        })
      })
    })

    user.textContent = ''
    for (let i = 0; i < book.users.length; i++){
      user.textContent = user.textContent + book.users[i].username + " ";
    }

    img.src = book.img_url;
    title.textContent = li.textContent;
    p.textContent = book.description

    li.addEventListener('click', () => {
      showPanel.innerHTML = '';
      usersList.append(user)
      showPanel.append(title, img, usersList, p, likeButton);
    })
    list.appendChild(li);
  }

function onClick(li) {

}

}