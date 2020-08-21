BASE_URL = "http://localhost:3000/posts";
const postsOl = document.querySelector(".all-posts");
const newPostForm = document.querySelector("#new-post-form");
const loginForm = document.querySelector("#login-form");
const navbarDiv = document.querySelector(".container-nav");
const fullPostDiv = document.querySelector(".full-post-div"); 
const loginButton = document.querySelector("#login-button");
let postsArray = [];
let loggedInUser = [];

const beforeLoginDiv = document.querySelector(".before-login");
const navContainer = document.querySelector(".nav-container")
const modal1login = document.querySelector("#modal1")
const createPostModal = document.querySelector("#modal")
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
      if (response.id) {
        showUserInfo(response);
        modal1login.style.display = "none"
      } else {
        console.log(response);
      }
    });
}

// ------------ WHAT TO DO WITH USER RESPONSE ------------
let showUserInfo = (user) => {
  loggedInUser.push(user)
  beforeLoginDiv.innerHTML = ""
  makeNewPostLi(user);
  newPostForm.user_id.value = user.id
    fetch(BASE_URL)
    .then((r) => r.json())
    .then((postsArr) => {
      postsArr.forEach((postObj) => {
        postsArray.push(postObj)
        mainPagePostToHtml(postObj);
      });
    });
  };
//make the id of the user be equal to the hidden value 
//create new post is submitted we have that id
//new post form.input.value = user.id 

// ------------ APPEND AFTER LOGIN ------------
function makeNewPostLi(singlePostObj) {
  navbarDiv.innerHTML = "";

  const h1ArteLuz = document.createElement("h1");
  h1ArteLuz.innerText = " ARTE LUZ"
  navContainer.append(h1ArteLuz)

  let newPostLi = document.createElement("li");
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
  randomLi.className ="random-li"

  let myPosts = document.createElement("li")
    myPosts.innerText = "My Posts"
    myPosts.className = "my-posts-btn"

  let allPosts = document.createElement("li")
    allPosts.innerText = "All Posts"

  let logOutButton = document.createElement("button");
  logOutButton.id = "button-button";
  logOutButton.innerText = "Logout";

  navbarDiv.append(paintingsLi, drawingsLi, photographyLi, randomLi, myPosts, allPosts, newPostLi, logOutButton);

  // ------------- MY POSTS EVT LISTENER -----
  myPosts.addEventListener("click", (evt) => {
    postsOl.innerHTML = ""
    singlePostObj.posts.forEach(singlePost => {
      mainPagePostToHtml(singlePost)
    });
  })

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
      postsArray.forEach((postObj) => {
        mainPagePostToHtml(postObj);
      });
    });
// ---------------------- PAINTINGS EVT LISTENER -----------
  paintingsLi.addEventListener("click", (evt) => {
    postsOl.innerHTML = ""
      postsArray.forEach((postObj) => {
        if (postObj.category === "paintings"){
          mainPagePostToHtml(postObj);
      }
      });
    });
// ---------------------- PHOTOGRAPHY EVT LISTENER -----------
photographyLi.addEventListener("click", (evt) => {
  postsOl.innerHTML = ""
    postsArray.forEach((postObj) => {
      if (postObj.category === "photography"){
        mainPagePostToHtml(postObj);
    }
  });
});
// ---------------------- DRAWINGS EVT LISTENER -----------
drawingsLi.addEventListener("click", (evt) => {
  postsOl.innerHTML = ""
    postsArray.forEach((postObj) => {
      if (postObj.category === "drawings"){
        mainPagePostToHtml(postObj);
    }
  });
});
// ---------------------- RANDOM EVT LISTENER -----------
randomLi.addEventListener("click", (evt) => {
  postsOl.innerHTML = ""
    postsArray.forEach((postObj) => {
      if (postObj.category === "random"){
        mainPagePostToHtml(postObj);
    }
   });
});

}
let logOut = () => {
  makeNewPostLi();
  loggedInUser = [];
  postsOl.innerHTML=""
  navbarDiv.innerHTML = ""
  beforeLoginDiv.append(loginButton)
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

//---------IMG EVT LISTENER-----------------
const modalPost = document.querySelector(".modal-post");
const xSpan = document.querySelector(".close")
// When the user clicks the button, open the modal 
postPicture.addEventListener("click", (evt) => {
  modalPost.style.display = "block";
  
  fullPostDiv.innerHTML = ""
  let modalBodyDiv = document.createElement("div")
  modalBodyDiv.className = "modal-body"

  let titleHeader = document.createElement("h3")
  titleHeader.innerText = postObj.title
  titleHeader.className = "post-title-header"

  let fullPostImg = document.createElement("img")
  fullPostImg.src = postObj.image
  fullPostImg.className = "post-title-img"

  let postDescription = document.createElement("p")
  postDescription.innerText = postObj.description

  let likeUserDiv = document.createElement("div");
  likeUserDiv.className = "like-user-div";
  
  let userSpan = document.createElement("span")
  userSpan.innerText = postObj.user_name
  userSpan.className = "user-span"

  let fullPostLikes = document.createElement("span")
  fullPostLikes.innerText = `❤️ ${postObj.likes.length}`
  fullPostLikes.className = "post-likes-span"

  let commentUl = document.createElement("ul")
  commentUl.className = "comment-ul"

  postObj.comments.forEach(function(comment) {
    let commentLi = document.createElement("li")
    commentLi.className = "comment-li"
    commentLi.innerText = `${comment.content} Written by: ${comment.user_name}`
    commentUl.append(commentLi)
  })
// ------------------ COMMENT FORM -----------------------------
  let commentForm = document.createElement("form")
    commentForm.id = "new-comment-form" 
    // let addACommentH2 = document.createElement("h2")
    // addACommentH2.innerText = "Write Your Commenere here!"
    let commentLabel = document.createElement("label")
    commentLabel.innerText = "comment: "
    let commentInput = document.createElement("input")
    commentInput.type = "text"
    commentInput.name = "comment"
    commentInput.id = "comment-input"
    let hiddenCommentField = document.createElement("input")
      hiddenCommentField.type = "hidden"
      hiddenCommentField.name = "userid"
    let submitComment = document.createElement("input")
    submitComment.type = "submit"
    submitComment.value = "submit"
    submitComment.id = "button-button"

    commentForm.append(commentLabel, commentInput, hiddenCommentField, submitComment)

  // ***************************************************************************
  // *************** EVT LISTENER FOR COMMENT FORM ***************************
  let createNewComment = (evt) => {
    evt.preventDefault()

      commentForm.userid.value = loggedInUser[0].id
    const userComment = {
      content: evt.target.comment.value,
      post_id: postObj.id,
      user_id: evt.target.userid.value
    }
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userComment)
    })
      .then(r => r.json())
      .then((newComment) => {
        // debugger
        let commentLi = document.createElement("li")
        commentLi.innerText = `${newComment.content} Written by: ${newComment.user_name}`
        commentUl.append(commentLi)
        commentForm.reset()
      })
  }
  commentForm.addEventListener("submit", createNewComment)

// *************************** END OF EVT LISTENER ******************************
// ************************ END OF COMMENT FORM **************************************

  let deletePostBtn = document.createElement("span")
  deletePostBtn.innerText = "🗑 DELETE THIS POST!"
      // EVENT LISTENER TO DELETE BUTTON
      deletePostBtn.addEventListener("click", (evt) => {
        fetch(`http://localhost:3000/posts/${postObj.id}`, {
            method: "DELETE"  
        })
        .then(resp => resp.json())
        .then(() => {
          postLi.remove()
          modalPost.style.display = "none";
        })
  }) //     END OF DELETE EVENT LISTENER
  likeUserDiv.append(userSpan, fullPostLikes)
  modalBodyDiv.append(titleHeader, fullPostImg, postDescription, likeUserDiv, commentUl, commentForm)
  // ------------------- CONDITON FOR DELETE BUTTON -----------------
  if (loggedInUser[0].id === postObj.user_id) {
    modalBodyDiv.append(deletePostBtn);
  }
  // -------------------------------------
  fullPostDiv.append(modalBodyDiv)
});

// When the user clicks on <span> (x), close the modal
xSpan.onclick = function() {
  modalPost.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modalPost.style.display = "none";
  }
}
//--------END OF IMAGE EVENT LISTENERRRR-------

//=============== LIKE EVT LISTENER ------------------
  likesSpan.addEventListener("click", (evt) => {
    let likesPlus = postObj.likes     // GET LIKES WE ALREADY HAVE 
        fetch(`http://localhost:3000/likes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                // ADD LIKES OBJECT PROPERTIES
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
        createPostModal.style.display = "none";
        newPostForm.reset()
      })
  }
  newPostForm.addEventListener("submit", createNewPostForm)