const apiKey = "AIzaSyAv2nQXfBiCiaW2soslEx--PVU6eurlFF8"

const bookContainer = document.getElementById("main") //This is where the books will populate, but start blank

const bookForm = document.getElementById("form") // controls the form

const search = document.getElementById("search") //controls the text form 

const searchButton = document.getElementById("searchBtn")

const bookCard = document.createElement("div")
bookCard.className = "book"
const bookImg = document.createElement("img")
const bookTitle = document.createElement("h3")
const bookAuthor = document.createElement("h4")


const clearBttn = document.getElementById("clearBtn")
const removeBooks = document.getElementsByClassName('book')
clearBttn.addEventListener('click', function() {
    removeBooks.parentNode.removeChild(removeBooks)
})



bookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // console.log(search.value)
    if (search.value === "") {
        window.alert("You must enter a book name")
    } else {
        let thumbnail = ''
        let info = ''
        let title = ''
        let author = ''
        

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.value}&key=AIzaSyAv2nQXfBiCiaW2soslEx--PVU6eurlFF8`)
         .then(response => response.json())
         .then(response => {
             for (i=0; i<response.items.length; i++) {
                
                id = response.items[i].id
                title = response.items[i].volumeInfo.title
                author = response.items[i].volumeInfo.authors
                info = response.items[i].volumeInfo.infoLink

                thumbnail = response.items[i].volumeInfo.imageLinks.thumbnail

                // console.log(thumbnail)

                // remove the previous search from DOM before appending new material:
                

                const bookCard = document.createElement("div")
                bookCard.className = "book"
                const bookThumbnail = document.createElement("img")
                bookThumbnail.src = thumbnail
                bookThumbnail.alt = "image"
                const bookTitle = document.createElement("h2")
                bookTitle.textContent = title
                const bookAuthor = document.createElement("h2")
                bookAuthor.textContent = author
                const bookInfo = document.createElement("BUTTON") //IS a button
                bookInfo.innerHTML = "Click here"
                bookInfo.addEventListener("click", function () {
                    console.log(info)
                    window.open(info)
                    
                }
                )
                 
                 bookCard.append(bookThumbnail,bookTitle, bookAuthor, bookInfo)
                 bookContainer.appendChild(bookCard)
                 bookForm.reset()
                 
                 
                }
                
                
            })
            
    }
})

