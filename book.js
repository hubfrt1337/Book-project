
const table = document.querySelector(".tablica");
table.innerHTML = `<tr>
<th>Title</th>
<th>Author</th>
<th>Pages</th>
<th>Whether</th>
<th>Delete</th>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td class="x"></td>
</tr>`


function Book(title, author, pages, whether, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.whether = whether;
    this.id = id

}
Book.prototype.changeStatus = function(){
    if(this.whether == "has been read"){
        this.whether = "not read yet"
    } else if (this.whether == "not read yet"){
        this.whether = "has been read"
    } else {
        this.whether = "not read yet"
    }
}

function addBookToLibrary(title, author, pages, whether){
  let uuid = crypto.randomUUID();
  let id = uuid
  uuid = new Book(title, author, pages, whether, id)
   library.push(uuid)
  
}
let statusOfRead;
let x;
let html = ``;
function showTable(){
    html = ``;
    library.forEach(function(bok){
        html +=`<tr>
        <td>${bok.title}</td>
        <td>${bok.author}</td>
        <td>${bok.pages}</td>
        <td class='status' data-id='${bok.id}'>${bok.whether}</td>
        <td class='deleteJs' data-id='${bok.id}'>x</td>
        </tr>`
    })
    table.innerHTML = `<tr>
<th>Title</th>
<th>Author</th>
<th>Pages</th>
<th>Whether</th>
<th>Delete</th>
</tr> ${html}`
    x = document.querySelectorAll('.deleteJs')
    statusOfRead = document.querySelectorAll('.status');
}


let library = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".new-js");
const submit = document.querySelector(".submitJs");
const close = document.querySelector(".closeJs");
let title;
let author;
let pages;
let stat;

showButton.addEventListener('click', () => {
    dialog.showModal()
})
close.addEventListener('click', (event) =>{
    event.preventDefault();
    dialog.close()
})
submit.addEventListener('click', function(event){
    event.preventDefault();
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value;
    stat = document.getElementById("whether").value;
    addBookToLibrary(title,author,pages,stat);
    showTable();
    dialog.close()
    xLoop();
    console.log(statusOfRead)
    stLoop();
})

table.addEventListener('click', function(){
    if(x){
        xLoop();
    }
      if(statusOfRead){
        stLoop();
    }
    
})

function xLoop(){
    x.forEach(del => {
            del.addEventListener('click', () => {
                const idOfX = del.dataset.id;
                library = library.filter(book => book.id !== idOfX);
                showTable();
            })
        }) 
}

function stLoop(){
    statusOfRead.forEach(st => {
        st.addEventListener('click', () => {
            const idOfSt = st.dataset.id;
            library.forEach(book => {
                if(book.id == idOfSt){
                    console.log(book.whether)
                    book.changeStatus();
                    showTable();
                    console.log(idOfSt);
                }
            })
        })
    }) 
}





