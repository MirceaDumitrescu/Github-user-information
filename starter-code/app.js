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

    // Log the response
    let link = data.html_url;
    let company = data.company;
    let joindate = moment(data.created_at).format("D MMM YYYY");
    let avatar = data.avatar_url;
    let desc = data.bio;
    let followers = data.followers;
    let following = data.following;
    let location = data.location;
    let name = data.name;
    let tag = data.login;
    let repos = data.public_repos;
    let twitter = data.twitter_username;
    let error = data.message;
    if (error === "Not Found") {
      searchError.classList.add("error-visible");
      console.log("Username Not Found.");
      inputForm.reset();
    } else {
      // searchError.classList.remove("error-visible");
      userName.innerHTML = name;
      if (name === null) {
        userName.innerHTML = tag;
        userName.classList.add("not-available");
      } else {
        userName.innerHTML = name;
      }
      userTag.innerHTML = "@" + tag;
      joinDate.innerHTML = "Joined " + joindate;
      description.innerHTML = desc;
      if (desc === null) {
        description.innerHTML = "This user has no profile description!";
        description.classList.add("not-available");
      } else {
        description.innerHTML = desc;
      }
      userAvatar.src = avatar;
      reposInfo.innerHTML = repos;
      locationIcon.innerHTML = location;
      if (location === null) {
        locationIcon.innerHTML = "Not Available";
        locationIcon.classList.add("not-available");
      } else {
        locationIcon.innerHTML = location;
      }
      github.innerHTML = link;
      companyName.innerHTML = company;
      if (company === null) {
        companyName.innerHTML = "Not Available";
        companyName.classList.add("not-available");
      } else {
        companyName.innerHTML = company;
      }
      followersInfo.innerHTML = followers;
      followingInfo.innerHTML = following;
      if (twitter === null) {
        twitterInfo.innerHTML = "Not Available";
        twitterInfo.classList.add("not-available");
      } else {
        twitterInfo.innerHTML = twitter;
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
// inputField.addEventListener("submit", requestUserRepos(inputField.value));

// function getData() {
//   let username = inputField.value;
//   inputForm.reset();
//   inputForm.preventDefault();
//   const data = requestUserRepos(username);
//   console.log(data.company);
// }
requestUserRepos("zenandreas");

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
