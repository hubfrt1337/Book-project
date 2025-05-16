
const table = document.querySelector(".tablica");


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
        <td class="pages">${bok.pages}</td>
        <td class="td-whether">
        <div>${bok.whether}</div>
        <i class="fa-solid fa-rotate status" data-id='${bok.id}'></i>
        </td>
        <td class="td-x"><span class='deleteJs' data-id='${bok.id}'>X</span></td>
        </tr>`
    })
    table.innerHTML = `<tr>
<th>Title</th>
<th>Author</th>
<th class="pages">Pages</th>
<th>Read</th>
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
    if(stat === ''){
        stat = "not read yet"
    }
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

addBookToLibrary("The Lion, the Witch and the Wardrobe", "C. S. Lewis", "172", "has been read");
showTable();

