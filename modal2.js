const modal1 = document.querySelector("#modal1")
document.querySelector("#login-button").addEventListener("click", () => {
  modal1.style.display = "block"
})
// Hide the form
modal1.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal1.style.display = "none"
  }
})