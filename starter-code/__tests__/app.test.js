import {
	getOS,
	changeTheme,
	requestUser,
	userNotFound,
	createUser,
	changeCSS,
} from "../app";
import "regenerator-runtime/runtime";
import { beforeEach } from "jest-circus";
import "whatwg-fetch";

let doc;

beforeEach(() => {
	const dummyData = {
		login: "MirceaDumitrescu",
		name: "Mircea Dumitrescu",
		bio: "I am a software developer",
		location: "Bucharest, Romania",
		company: "Mircea Dumitrescu",
		twitterInfo: "https://twitter.com/MirceaDumitrescu",
		html_url: "",
		avatar_url: "",
		public_repos: "",
		followers: "",
		following: "",
	};
	global.fetch = jest.fn(() => Promise.resolve(dummyData));
	function onSuccess(response) {
		const rawHTML = response.text();
		const parser = new DOMParser();
		doc = parser.parseFromString(rawHTML, "text/html");
		console.log(doc);
		done();
	}
	function onError(error) {
		console.log(error);
	}
	fetch("../index.html").then(onSuccess, onError);
});

//check if Search button exists
test("Search button exists", () => {
	//check if button exists in doc
});

test("DOM loads corretly", () => {
	expect(document.querySelector("body")).toBeTruthy();
});

test("Should change theme of body to dark", () => {
	const body = document.querySelector("body");
	changeTheme("dark");
	expect(body.classList.contains("dark--theme")).toBe(true);
});

test("Should change theme of body to light", () => {
	const body = document.querySelector("body");
	changeTheme("light");
	expect(body.classList.contains("light--theme")).toBe(true);
});

test("Should return Light Theme", () => {
	const platform = "MacIntel";
	getOS(platform);
	expect(document.body.classList.contains("light--theme")).toBe(true);
});

test("Should return Dark Theme", () => {
	const platform = "Windows";
	getOS(platform);
	expect(document.body.classList.contains("dark--theme")).toBe(true);
});

// test("Should return valid css classes because user exists", () => {
// 	const fakeUser = {
// 		name: "MirceaDumitrescu",
// 		bio: "Test Description",
// 		location: "Test Location",
// 		company: "Test Company",
// 		twitterInfo: "Test Twitter",
// 	};

// 	changeCSS(fakeUser);

// 	expect(
// 		document
// 			.querySelector(".usr-placeholder")
// 			.classList.contains("not-available")
// 	).toBe(false);
// 	expect(
// 		document
// 			.querySelector(".desc-placeholder")
// 			.classList.contains("not-available")
// 	).toBe(false);
// 	expect(
// 		document
// 			.querySelector(".location-placeholder")
// 			.classList.contains("not-available")
// 	).toBe(false);
// 	expect(
// 		document
// 			.querySelector(".company-placeholder")
// 			.classList.contains("not-available")
// 	).toBe(false);
// 	expect(
// 		document
// 			.querySelector(".twitter-placeholder")
// 			.classList.contains("not-available")
// 	).toBe(false);
// });
