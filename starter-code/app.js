import fetch from "cross-fetch";
import moment from "moment";

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

let userPlatform = navigator.platform;

const changeTheme = (theme) => {
	switch (theme) {
		case "light":
			body.classList.remove("dark--theme");
			body.classList.add("light--theme");
			break;
		case "dark":
			body.classList.remove("light--theme");
			body.classList.add("dark--theme");
			break;
		default:
			break;
	}
};

//EVENT LISTENERS

document.addEventListener("DOMContentLoaded", () => {
	darkTheme.addEventListener("click", function (e) {
		changeTheme("dark");
	});
	lightTheme.addEventListener("click", function (e) {
		changeTheme("light");
	});

	searchBtn.addEventListener("click", () => {
		inputField.value.length > 2
			? requestUser(inputField.value)
			: (searchError.style.display = "block");
	});

	inputForm.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	inputField.addEventListener("keypress", (e) => {
		e.key === "Enter"
			? inputField.value.length > 2
				? requestUser(inputField.value)
				: (searchError.style.display = "block")
			: null;
	});
});

let apiJoinDate;

const requestUser = async (username) => {
	try {
		const res = await fetch(`https://api.github.com/users/${username}`);
		const fetchedData = await res.json();
		apiJoinDate = moment(fetchedData.created_at).format("D MMM YYYY");
		userNotFound(fetchedData);
	} catch (error) {
		console.error(error);
	}
};

const userNotFound = (fetchedData) => {
	fetchedData.name
		? (searchError.classList.remove("error-visible"), createUser(fetchedData))
		: (searchError.classList.add("error-visible"), inputForm.reset());
};

const createUser = (fetchedData) => {
	userName.innerHTML = fetchedData.name ? fetchedData.name : fetchedData.login;
	userTag.innerHTML = "@" + fetchedData.login;
	joinDate.innerHTML = "Joined " + apiJoinDate;
	description.innerHTML = fetchedData.bio
		? fetchedData.bio
		: "This user has no profile description!";
	userAvatar.src = fetchedData.avatar_url;
	reposInfo.innerHTML = fetchedData.public_repos;
	locationIcon.innerHTML = fetchedData.location
		? fetchedData.location
		: "Not Available";
	github.innerHTML = `<a href=${fetchedData.html_url} target="_blank">${fetchedData.html_url}</a>`;
	twitterInfo.innerHTML = fetchedData.twitter_username
		? `<a href=https://twitter.com/${fetchedData.twitter_username} target="_blank">@${fetchedData.twitter_username}</a>`
		: "Not Available";
	companyName.innerHTML = fetchedData.company
		? fetchedData.company
		: "Not Available";
	followersInfo.innerHTML = fetchedData.followers;
	followingInfo.innerHTML = fetchedData.following;
	changeCSS(fetchedData);
};

const changeCSS = (fetchedData) => {
	fetchedData.name
		? userName.classList.remove("not-available")
		: userName.classList.add("not-available");
	fetchedData.bio
		? description.classList.remove("not-available")
		: description.classList.add("not-available");
	fetchedData.location
		? locationIcon.classList.remove("not-available")
		: locationIcon.classList.add("not-available");
	fetchedData.company
		? companyName.classList.remove("not-available")
		: companyName.classList.add("not-available");
	fetchedData.twitterInfo
		? twitterInfo.classList.remove("not-available")
		: twitterInfo.classList.add("not-available");
};

function getOS(platform) {
	platform ? (platform = platform) : (platform = userPlatform);

	platform.includes("Mac") ? changeTheme("light") : null;

	platform.includes("Win") ? changeTheme("dark") : null;

	platform.includes("Linux") ? changeTheme("light") : null;

	platform.includes("Android") ? changeTheme("dark") : null;

	platform.includes("iPhone") ? changeTheme("light") : null;

	platform.includes("iPad") ? changeTheme("light") : null;

	platform.includes("iPod") ? changeTheme("light") : null;
}

// if (platform.includes("Mac")) {
// 	changeTheme("light");
// } else if (iosPlatforms.indexOf(platform) !== -1) {
// 	os = "iOS";
// 	changeTheme("light");
// } else if (windowsPlatforms.indexOf(platform) !== -1) {
// 	os = "Windows";
// 	changeTheme("dark");
// } else if (/Android/.test(userAgent)) {
// 	os = "Android";
// 	changeTheme("dark");
// } else if (!os && /Linux/.test(platform)) {
// 	os = "Linux";
// 	changeTheme("light");
// }
// return os;
// }

getOS();
requestUser("MirceaDumitrescu");

export { getOS, changeTheme, requestUser, userNotFound, createUser, changeCSS };

// function requestUserRepos(username) {
// 	// create new XMLHttpRequest object
// 	const xhr = new XMLHttpRequest();
// 	// GitHub endpoint, dynamically passing in specified username
// 	const url = `https://api.github.com/users/${username}`;
// 	// Open a new connection, using a GET request via URL endpoint
// 	// Providing 3 arguments (GET/POST, The URL, Async True/False)
// 	xhr.open("GET", url, true);
// 	// When request is received
// 	// Process it here
// 	xhr.onload = function () {
// 		// Parse API data into JSON
// 		const data = JSON.parse(this.response);

// 		if (data.message === "Not Found") {
// 			searchError.classList.add("error-visible");
// 			console.log("Username Not Found.");
// 			inputForm.reset();
// 		} else {
// 			searchError.classList.remove("error-visible");
// 			userName.innerHTML = data.name;
// 			if (data.name === null) {
// 				userName.innerHTML = data.login;
// 				userName.classList.add("not-available");
// 			} else {
// 				userName.innerHTML = data.name;
// 			}
// 			userTag.innerHTML = "@" + data.login;
// 			joinDate.innerHTML = "Joined " + joindate;
// 			description.innerHTML = data.bio;
// 			if (data.bio === null) {
// 				description.innerHTML = "This user has no profile description!";
// 				description.classList.add("not-available");
// 			} else {
// 				description.innerHTML = data.bio;
// 			}
// 			userAvatar.src = data.avatar_url;
// 			reposInfo.innerHTML = data.public_repos;
// 			locationIcon.innerHTML = data.location;
// 			if (data.location === null) {
// 				locationIcon.innerHTML = "Not Available";
// 				locationIcon.classList.add("not-available");
// 			} else {
// 				locationIcon.innerHTML = data.location;
// 			}
// 			github.innerHTML = `<a href=${data.html_url} target="_blank">${data.html_url}</a>`;
// 			companyName.innerHTML = data.company;
// 			if (data.company === null) {
// 				companyName.innerHTML = "Not Available";
// 				companyName.classList.add("not-available");
// 			} else {
// 				companyName.innerHTML = data.company;
// 			}
// 			followersInfo.innerHTML = data.followers;
// 			followingInfo.innerHTML = data.following;
// 			if (data.twitter_username === null) {
// 				twitterInfo.innerHTML = "Not Available";
// 				twitterInfo.classList.add("not-available");
// 			} else {
// 				twitterInfo.innerHTML = data.twitter_username;
// 			}
// 		}
// 	};

// 	// Send the request to the server
// 	xhr.send();
// }
