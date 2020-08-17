BASE_URL = "http://localhost:3000/posts"
const postsOl = document.querySelector(".all-posts")
const newPostForm = document.querySelector("#new-post-form")


const postsArray = []
// const singlePost = postsArray[0]
// console.log(postsArray)

function posts() {
fetch(BASE_URL)
.then(r => r.json())
.then(postsArr => {
    postsArr.forEach(postObj => {
        mainPagePostToHtml(postObj)
        postsArray.push(postObj)
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

function createNewPostForm(postObj) {
newPostForm.addEventListener("submit", evt => {
    event.preventDefault()
// console.log(evt.target.username.value)
    // let allPosts = Post.all
    const userInput = {
      image: evt.target.image.value,
      description: evt.target.description.value,
      category: evt.target.category.value,
      user: { username: evt.target.username.value}
    }
    console.log(userInput)
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    })
      .then(r => r.json())
      .then((newPost) => {
        mainPagePostToHtml(newPost)
        debugger
        
        newPostForm.reset()
        // allPosts.push(newPost)
      })
  })
}

