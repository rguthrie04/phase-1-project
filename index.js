const apiKey = "AIzaSyAv2nQXfBiCiaW2soslEx--PVU6eurlFF8"

const bookContainer = document.getElementById("main") //This is where the books will populate, but start blank
const bookForm = document.getElementById("form") // controls the form
const clearBtn = document.getElementById("clearBtn")

clearBtn.addEventListener('click', deleteBookCards)
const header = document.querySelector('header')
header.style.background = "black"


const search = document.getElementById("search") //controls the text form 

const searchButton = document.getElementById("searchBtn")

const bookCard = document.createElement("div")
bookCard.className = "book"
const bookImg = document.createElement("img")
const bookTitle = document.createElement("h3")
const bookAuthor = document.createElement("h4")
const backgroundButton =document.createElement('button')
backgroundButton.innerText = "Change Background"
backgroundButton.id = "changeButton"

const headerBackground = header.style.background

const changeButton = document.getElementById("changeButton")

bookForm.appendChild(backgroundButton)

let isColored = false
backgroundButton.addEventListener('click', function () {
    
    if (isColored) {
        header.style.background = "black"
        isColored = false
    } else {
        header.style.background = "white"
        isColored=true


       }
    
    console.log("test")
    
})





bookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    deleteBookCards ()

    // console.log(search.value)
    if (search.value === "") {
        window.alert("You must enter a book name")
    } else {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.value}&key=AIzaSyAv2nQXfBiCiaW2soslEx--PVU6eurlFF8`)
         .then(response => response.json())
         .then(response => {
             for (i=0; i<response.items.length; i++) {
                let thumbnail = ''
                let info = ''
                let title = ''
                let author = ''

                id = response.items[i].id
                title = response.items[i].volumeInfo.title
                author = response.items[i].volumeInfo.authors
                info = response.items[i].volumeInfo.infoLink
                
                thumbnail = response.items[i].volumeInfo.imageLinks.thumbnail

                
                const bookCard = document.createElement("div")
                bookCard.className = "book"
                const bookThumbnail = document.createElement("img")
                bookThumbnail.src = thumbnail
                bookThumbnail.alt = `cover image of ${title} by ${author}` 
                const bookTitle = document.createElement("h2")
                bookTitle.textContent = `Title: ${title}`
                const bookAuthor = document.createElement("h3")
                bookAuthor.textContent = `Author(s): ${author}`
                const bookInfo = document.createElement("BUTTON") //IS a button
                bookInfo.className = "infoButton"
                
                bookInfo.innerHTML = "More information"
                bookInfo.addEventListener("click", function () {
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

function deleteBookCards () {
    const bookCards = document.getElementsByClassName('book')
    while (bookCards.length >0) {
        bookCards[0].parentNode.removeChild(bookCards[0])
    }
}

function changeBackground() {

}