BASE_URL = "http://localhost:3000/posts";
const postsOl = document.querySelector(".all-posts");
const newPostForm = document.querySelector("#new-post-form");
const loginForm = document.querySelector("#login-form")

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
  // debugger
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
  userNameSpan.innerText = postObj.user_name;

  let likesSpan = document.createElement("span");
  likesSpan.className = "likes-span";
  likesSpan.innerText = `❤️ ${postObj.likes.length}`;

  detailDiv.append(userNameSpan, likesSpan)
  postLi.append(postPicture, titleh3, detailDiv);
  postsOl.append(postLi);

  newPostForm.addEventListener("submit", createNewPostForm)
}

// -----------------LOGIN FORM--------------------
let showLoginForm = () => {
  
  loginForm.addEventListener("submit", handleLoginForm)
  
}   

let handleLoginForm = (evt) => {
  evt.preventDefault()
  let username = evt.target.username.value
  debugger
  console.log(username)
  fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify({
          usernameFromFrontEnd: username
      })
  })
      .then(res => res.json())
      .then(response => {
          if(response.id){
              showTeacherInformation(response)
          } else {
              console.log(response)
          }

      })
}


















// // ------------- NEW POST FORM -------------------
let createNewPostForm = (evt) => {
    evt.preventDefault()
// console.log(evt.target.username.value)

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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
      .then(r => r.json())
      .then((newPost) => {
        mainPagePostToHtml(newPost)
        debugger
        newPostForm.reset()
      })
  }

//   fetch("http://localhost:3000/posts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newPostObj),
//   })
//     .then((r) => r.json())
//     .then((newPost) => {
//       debugger;
//       mainPagePostToHtml(newPost);
//     });
