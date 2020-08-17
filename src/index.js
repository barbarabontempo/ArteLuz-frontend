BASE_URL = "http://localhost:3000/posts"
const postsOl = document.querySelector(".all-posts")
const newPostForm = document.querySelector("#new-post-form")


const postsArray = []

function posts() {
fetch(BASE_URL)
.then(r => r.json())
.then(postsArr => {
    postsArr.forEach(postObj => {
        mainPagePostToHtml(postObj)
        // postsArray.push(postObj)
    })
})
};
posts()

function mainPagePostToHtml(postObj){
    let entirePostDiv = document.createElement("div")
    entirePostDiv.className = "item"
    let postLi = document.createElement("li")
        postLi.className = "post-title"
        postLi.innerText = postObj.title
    let photoDiv = document.createElement("div")
        photoDiv.className = "image-div"
    let postPicture = document.createElement("img")
        postPicture.className = "images"
        postPicture.src = postObj.image 
    let detailsDiv = document.createElement("div")
    let userNameSpan = document.createElement("span")
        userNameSpan.innerText = postObj.user["username"]
    let likesSpan = document.createElement("span")
        likesSpan.innerText = `❤️ ${postObj.likes.length}`
        
        photoDiv.append(postPicture)
        detailsDiv.append(userNameSpan, likesSpan)
        postLi.append(photoDiv, detailsDiv)
        entirePostDiv.append(postLi)
        postsOl.append(entirePostDiv)
}

newPostForm.addEventListener("submit", event => {
    event.preventDefault()

    const newPostObj = {
      username: newPostForm.name.value,
      image: newPostForm.image.value,
      description: newPostForm.description.value,
      category: newPostForm.category.value
    }
  
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPostObj),
    })
      .then(r => r.json())
      .then(newPost => {
        debugger
        mainPagePostToHtml(newPost)
      })
  
  })

