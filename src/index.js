BASE_URL = "http://localhost:3000/posts"
const postsOl = document.querySelector(".all-posts")
const postsArray = []

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
    let postLi = document.createElement("li")
        postLi.className = "main-page-post"
        postLi.innerText = postObj.title
    let postPicture = document.createElement("img")
        postPicture.src = postObj.image 
    let detailsDiv = document.createElement("div")
    let userNameSpan = document.createElement("span")
        userNameSpan.innerText = postObj.user["username"]
    let likesSpan = document.createElement("span")
        likesSpan.innerText = `❤️ ${postObj.likes.length}`
        
        detailsDiv.append(userNameSpan, likesSpan)
        postLi.append(postPicture, detailsDiv)
        postsOl.append(postLi)
}


