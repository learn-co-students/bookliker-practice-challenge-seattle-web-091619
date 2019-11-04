const BOOKS_URL = "http://localhost:3000/books"
document.addEventListener("DOMContentLoaded", function() {
   fetchBooks();
});
function fetchBooks(){
   fetch(BOOKS_URL)
   .then(resp => resp.json())
   .then(json => {
       displayBooks(json);
   })
}
function displayBooks(books){
   let listPanel = document.getElementById('list-panel');
   let showPanel = document.getElementById('show-panel');
   for(const book of books){
       let li = document.createElement('li');
       li.addEventListener('click', (ev) => {
           ev.preventDefault();
           let div = document.createElement('div');
           div.id = "div-id";
           let heading = document.createElement('h3');
           heading.textContent = book.title;
           let img = document.createElement('img');
           img.src = book.img_url;
           let p = document.createElement('p');
           p.textContent = book.description;
           let button = document.createElement('button');
           button.textContent = "Like Book";
           button.addEventListener('click', (ev) => {
               ev.preventDefault();
               patchRequest(book);
           })
           let userList = document.createElement('ul');
           book.users.forEach(user => {
               let userLi = document.createElement('li');
               userLi.textContent = user.username;
               userList.appendChild(userLi);
           });
           div.append(heading, img, p, userList, button);
           showPanel.appendChild(div);
       })
       li.textContent = book.title;
       listPanel.appendChild(li);
   }
}
function patchRequest(book){
   let user = {};
   user.id = 1;
   user.username = "pouros";
   book.users.push(user);
   fetch(BOOKS_URL + "/" + book.id, {
       method: "PATCH",
       headers: {
           'Content-Type': "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify(book)
   })
   .then(resp => resp.json())
   .then(json => addUserToBook(json))
}
function addUserToBook(json){
   let listPanel = document.getElementById('list-panel');
   while(listPanel.firstChild){
       listPanel.firstChild.remove();
   }
   let showPanel = document.getElementById('show-panel');
   while(showPanel.firstChild){
       showPanel.firstChild.remove();
   }
   fetchBooks();
}
