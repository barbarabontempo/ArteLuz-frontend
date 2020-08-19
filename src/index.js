BASE_URL = "http://localhost:3000/posts";
const postsOl = document.querySelector(".all-posts");
const newPostForm = document.querySelector("#new-post-form");
const loginForm = document.querySelector("#login-form");
const navbarDiv = document.querySelector(".container");
const postsArray = [];

// -----------------LOGIN FORM--------------------
loginForm.addEventListener("submit", handleLoginForm);

function handleLoginForm(evt) {
  evt.preventDefault();
  let username = evt.target.username.value;
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      usernameFromFrontEnd: username,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.id) {
        showUserInfo(response);
      } else {
        console.log(response);
      }
    });
}



// ------------ WHAT TO DO WITH USER RESPONSE ------------
let showUserInfo = (user) => {
  makeNewPostLi(user);
  newPostForm.user_id.value = user.id
  user.posts.forEach(singlePost => {
    mainPagePostToHtml(singlePost)
  });
//make the id of the user be equal to the hidden value 
//create new post is submitted we have that id
//new post form.input.value = user.id 

};

// ------------ APPEND AFTER LOGIN ------------

function makeNewPostLi() {
  navbarDiv.innerHTML = "";
  let newPostLi = document.createElement("button");
  newPostLi.className = "item1";
  newPostLi.id = "make-post-button";
  newPostLi.innerText = "Make a New Post";

  let paintingsLi = document.createElement("li")
  paintingsLi.innerText = "Paintings"

  let drawingsLi = document.createElement("li")
  drawingsLi.innerText = "Drawings"

  let photographyLi = document.createElement("li")
  photographyLi.innerText = "Photography"

  let randomLi = document.createElement("li")
  randomLi.innerText = "Random"

  let allPosts = document.createElement("button")
    allPosts.innerText = "All Posts"

  let logOutButton = document.createElement("button");
  logOutButton.className = "btn btn-danger";
  logOutButton.innerText = "Logout";

  navbarDiv.append(paintingsLi, drawingsLi, photographyLi, randomLi, allPosts, newPostLi, logOutButton);

  const modal = document.querySelector("#modal");
  newPostLi.addEventListener("click", () => {
    modal.style.display = "block";
  });
  // Hide the form
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.action === "close") {
      modal.style.display = "none";
    }
  });
  // ---------------------- LOGOUT -----------
  logOutButton.addEventListener("click", (evt) => {
    logOut();
  });
// ---------------------- ALL POSTS EVT LISTENER -----------
  allPosts.addEventListener("click", (evt) => {
    postsOl.innerHTML = ""
    fetch(BASE_URL)
    .then((r) => r.json())
    .then((postsArr) => {
      console.log(postsArr)
      postsArr.forEach((postObj) => {
        mainPagePostToHtml(postObj);
        // postsArray.push(postObj)
      });
    });
  })
// ---------------------- PAINTINGS EVT LISTENER -----------
  paintingsLi.addEventListener("click", (evt) => {
    postsOl.innerHTML = ""
    fetch(BASE_URL)
    .then((r) => r.json())
    .then((postsArr) => {
      console.log(postsArr)
      postsArr.forEach((postObj) => {
        if (postObj.category === "paintings"){
          mainPagePostToHtml(postObj);
      }
      });
    });
  })
// ---------------------- PHOTOGRAPHY EVT LISTENER -----------
photographyLi.addEventListener("click", (evt) => {
  postsOl.innerHTML = ""
  fetch(BASE_URL)
  .then((r) => r.json())
  .then((postsArr) => {
    console.log(postsArr)
    postsArr.forEach((postObj) => {
      if (postObj.category === "photography"){
        mainPagePostToHtml(postObj);
    }
    });
  });
})
// ---------------------- DRAWINGS EVT LISTENER -----------
drawingsLi.addEventListener("click", (evt) => {
  postsOl.innerHTML = ""
  fetch(BASE_URL)
  .then((r) => r.json())
  .then((postsArr) => {
    console.log(postsArr)
    postsArr.forEach((postObj) => {
      if (postObj.category === "drawings"){
        mainPagePostToHtml(postObj);
    }
    });
  });
})
// ---------------------- RANDOM EVT LISTENER -----------
randomLi.addEventListener("click", (evt) => {
  postsOl.innerHTML = ""
  fetch(BASE_URL)
  .then((r) => r.json())
  .then((postsArr) => {
    console.log(postsArr)
    postsArr.forEach((postObj) => {
      if (postObj.category === "random"){
        mainPagePostToHtml(postObj);
    }
    });
  });
})

}
let logOut = () => {
  makeNewPostLi();
  postsOl.innerHTML=""
};

function mainPagePostToHtml(postObj) {
  let postLi = document.createElement("li");
  postLi.className = "post-item";

  let postPicture = document.createElement("img");
  postPicture.className = "images";
  postPicture.src = postObj.image;

  let titleh3 = document.createElement("h4");
  titleh3.className = "h4-titles";
  titleh3.innerText = postObj.title;

  let detailDiv = document.createElement("div");
  detailDiv.className = "detail-div";
  let userNameSpan = document.createElement("span");
  userNameSpan.className = "username-spans";
  userNameSpan.innerText = postObj.user_name;

  let likesSpan = document.createElement("span");
  likesSpan.className = "likes-span";
  likesSpan.innerText = `❤️ ${postObj.likes.length}`;

  detailDiv.append(userNameSpan, likesSpan);
  postLi.append(postPicture, titleh3, detailDiv);
  postsOl.append(postLi);

  //=============== LIKE EVT LISTENER ------------------
  likesSpan.addEventListener("click", (evt) => {
    let likesPlus = postObj.likes     // GET LIKES WE ALREADY HAVE 
        fetch(`http://localhost:3000/likes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                // ADD LIKES OBJECT PROPERTIES
                // quoteId: singleQuote.id,   
                post_id: postObj.id,
                user_id: postObj.user_id
            })
            })
            .then(resp => resp.json())
            .then((newLike) => {
                // PUSH THE NEW LIKE TO OUR LIKES ARRAY AKA LIKESPLUS
                likesPlus.push(newLike)
                // ADD THE UPDATED ARRAY AKA LIKESPLUS TO OUR LIKES SPAN
                likesSpan.innerText = `❤️ ${likesPlus.length}`
            })
  })
}

//------------- NEW POST FORM -------------------
let createNewPostForm = (evt) => {
    evt.preventDefault()

    const userInput = {
      title: evt.target.title.value,
      image: evt.target.image.value,
      description: evt.target.description.value,
      category: evt.target.category.value,
      user_id: evt.target.user_id.value
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
        newPostForm.reset()
      })
  }
  newPostForm.addEventListener("submit", createNewPostForm)
