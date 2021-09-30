const darkTheme = document.querySelector(".theme__dark");
const lightTheme = document.querySelector(".theme__light");
const body = document.querySelector("body");
const inputField = document.querySelector(".input__field");
const searchBtn = document.querySelector(".search__button");
const userAvatar = document.querySelector(".avatar");
const userName = document.querySelector(".usr-placeholder");
const userTag = document.querySelector(".urtag-placeholder");
const joinDate = document.querySelector(".join-placeholder");
const description = document.querySelector(".desc-placeholder");
const reposInfo = document.querySelector(".repos-number");
const followersInfo = document.querySelector(".followers-number");
const followingInfo = document.querySelector(".following-number");
const locationIcon = document.querySelector(".location-placeholder");
const github = document.querySelector(".git-placeholder");
const twitterInfo = document.querySelector(".twitter-placeholder");
const companyName = document.querySelector(".company-placeholder");
const inputForm = document.querySelector(".search__input__form");
const searchError = document.querySelector(".search-error");

darkTheme.addEventListener("click", function (e) {
  body.classList.add("dark--theme");
  body.classList.remove("light--theme");
});
lightTheme.addEventListener("click", function (e) {
  body.classList.remove("dark--theme");
  body.classList.add("light--theme");
});

function requestUserRepos(username) {
  // create new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  // GitHub endpoint, dynamically passing in specified username
  const url = `https://api.github.com/users/${username}`;
  // Open a new connection, using a GET request via URL endpoint
  // Providing 3 arguments (GET/POST, The URL, Async True/False)
  xhr.open("GET", url, true);
  // When request is received
  // Process it here
  xhr.onload = function () {
    // Parse API data into JSON
    const data = JSON.parse(this.response);

    let joindate = moment(data.created_at).format("D MMM YYYY");
    if (data.message === "Not Found") {
      searchError.classList.add("error-visible");
      console.log("Username Not Found.");
      inputForm.reset();
    } else {
      searchError.classList.remove("error-visible");
      userName.innerHTML = data.name;
      if (data.name === null) {
        userName.innerHTML = data.login;
        userName.classList.add("not-available");
      } else {
        userName.innerHTML = data.name;
      }
      userTag.innerHTML = "@" + data.login;
      joinDate.innerHTML = "Joined " + joindate;
      description.innerHTML = data.bio;
      if (data.bio === null) {
        description.innerHTML = "This user has no profile description!";
        description.classList.add("not-available");
      } else {
        description.innerHTML = data.bio;
      }
      userAvatar.src = data.avatar_url;
      reposInfo.innerHTML = data.public_repos;
      locationIcon.innerHTML = data.location;
      if (data.location === null) {
        locationIcon.innerHTML = "Not Available";
        locationIcon.classList.add("not-available");
      } else {
        locationIcon.innerHTML = data.location;
      }
      github.innerHTML = `<a href=${data.html_url} target="_blank">${data.html_url}</a>`;
      companyName.innerHTML = data.company;
      if (data.company === null) {
        companyName.innerHTML = "Not Available";
        companyName.classList.add("not-available");
      } else {
        companyName.innerHTML = data.company;
      }
      followersInfo.innerHTML = data.followers;
      followingInfo.innerHTML = data.following;
      if (data.twitter_username === null) {
        twitterInfo.innerHTML = "Not Available";
        twitterInfo.classList.add("not-available");
      } else {
        twitterInfo.innerHTML = data.twitter_username;
      }
    }
  };

  // Send the request to the server
  xhr.send();
}

searchBtn.addEventListener("click", () => {
  if (inputField.value.length > 1) {
    requestUserRepos(inputField.value);
  } else {
    searchError.style.display = "block";
  }
});

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (inputField.value.length > 1) {
      requestUserRepos(inputField.value);
    } else {
      searchError.style.display = "block";
    }
  }
});

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
    body.classList.remove("dark--theme");
    body.classList.add("light--theme");
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
    body.classList.remove("dark--theme");
    body.classList.add("light--theme");
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
    body.classList.add("dark--theme");
    body.classList.remove("light--theme");
  } else if (/Android/.test(userAgent)) {
    os = "Android";
    body.classList.add("dark--theme");
    body.classList.remove("light--theme");
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
    body.classList.remove("dark--theme");
    body.classList.add("light--theme");
  }
  return os;
}

getOS();
requestUserRepos("zenandreas");
