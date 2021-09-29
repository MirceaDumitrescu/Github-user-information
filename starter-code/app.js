const darkTheme = document.querySelector(".theme__dark");
const lightTheme = document.querySelector(".theme__light");
const body = document.querySelector("body");

darkTheme.addEventListener("click", function (e) {
  body.classList.add("dark--theme");
  body.classList.remove("light--theme");
});
lightTheme.addEventListener("click", function (e) {
  body.classList.remove("dark--theme");
  body.classList.add("light--theme");
});
