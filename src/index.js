BASE_URL = "http://localhost:3000/posts";
const postsOl = document.querySelector(".all-posts");
const newPostForm = document.querySelector("#new-post-form");

const postsArray = [];

function posts() {
  fetch(BASE_URL)
    .then((r) => r.json())
    .then((postsArr) => {
      postsArr.forEach((postObj) => {
        mainPagePostToHtml(postObj);
        // postsArray.push(postObj)
      });
    });
}
posts();

function mainPagePostToHtml(postObj) {
  let postLi = document.createElement("li");
  postLi.className = "post-item";

  let postPicture = document.createElement("img");
  postPicture.className = "images";
  postPicture.src = postObj.image;

  let titleh3 = document.createElement("h4");
  titleh3.className = "h4-titles";
  titleh3.innerText = postObj.title;

  let detailDiv = document.createElement("div")
  detailDiv.className = "detail-div"
  let userNameSpan = document.createElement("span");
  userNameSpan.className = "username-spans";
  userNameSpan.innerText = postObj.user["username"];

  let likesSpan = document.createElement("span");
  likesSpan.className = "likes-span";
  likesSpan.innerText = `❤️ ${postObj.likes.length}`;

  detailDiv.append(userNameSpan, likesSpan)
  postLi.append(postPicture, titleh3, detailDiv);
  postsOl.append(postLi);
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

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostObj),
  })
    .then((r) => r.json())
    .then((newPost) => {
      debugger;
      mainPagePostToHtml(newPost);
    });
});
