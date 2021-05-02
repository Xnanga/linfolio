"use: strict";

// Variables

const init = function () {
  setInterval(updateDate, 1000);
  setInterval(updateTime, 1000);
  setUpEventListeners();
};

// UI

const updateTime = function () {
  const topBarTime = document.querySelector(".date-time__time");
  const currentTime = getCurrentTime();
  if (topBarTime.textContent === currentTime) return;
  topBarTime.textContent = currentTime;
};

const updateDate = function () {
  const topBarDate = document.querySelector(".date-time__date");
  const currentDate = getCurrentDate();
  if (topBarDate.textContent === currentDate) return;
  topBarDate.textContent = currentDate;
};

const createWindow = function (pagePath, contentHTML) {
  const windowContainer = document.querySelector(".window-container");
  const windowHTML = `<div class="window">
    <div class="window__header">
      <div class="window__header-bar">
        <span>${pagePath}</span>
      </div>
      <div class="window__header-btns">
        <img src="icons/minus.png" alt="" class="window-btn">
        <img src="icons/cancel-circle.png" alt="" class="window-btn">
      </div>
    </div>
    <div class="window__main">
    ${contentHTML}
      </div>
  </div>
    `;

  windowContainer.insertAdjacentHTML("beforeend", windowHTML);
};

// Events

const topBarEventHandler = function (e) {
  const clickedEl = e.target;
  const topBar = document.querySelector(".top-strip");
  if (clickedEl === topBar) return;

  console.log(clickedEl);
};

const sideBarEventHandler = function (e) {
  const clickedEl = e.target;
  const sideBar = document.querySelector(".side-menu");
  if (clickedEl === sideBar) return;

  if (clickedEl.id === "about") prepareWindowContent("about");
  if (clickedEl.id === "portfolio") prepareWindowContent("portfolio");
  if (clickedEl.id === "skills") prepareWindowContent("skills");
  if (clickedEl.id === "contact") prepareWindowContent("contact");

  console.log(clickedEl);
};

const setUpEventListeners = function () {
  const topbar = document.querySelector(".top-strip");
  const sidebar = document.querySelector(".side-menu");

  topbar.addEventListener("click", topBarEventHandler);
  sidebar.addEventListener("click", sideBarEventHandler);
};

// Logic

const prepareWindowContent = function (windowName) {
  // About Content
  const aboutPagePath = `C:\\home\\jamie\\about`;
  const aboutHTMLContent = `<h1>Hi there! I'm Jamie Peutherer</h1>
    <p>I'm a self-taught frontend web developer with a strong background in technical Search Engine Optimisation (7+ years in the field!).</p>
    <p>I like to build all sorts of odd websites and apps, especially webapp recreations of other tools and programs (<strong>like Ubuntu Linux!</strong>)</p>
    <p>I'm still learning more and more about good web development every day (<i>Who doesn't have more to learn?</i>), but I'm eager to jump right into a professional role real soon.</p>
    <p>You can find quick links to the most important stuff below - otherwise, feel free to click around and explore.</p>
    <div class="quicklink-grid">
      <div class="quicklink-grid__item">
        <span>CV</span>
      </div>
      <div class="quicklink-grid__item">
        <span>Portfolio</span>
      </div>
      <div class="quicklink-grid__item">
        <span>Skills</span>
      </div>
      <div class="quicklink-grid__item">
        <span>Github</span>
      </div>
      <div class="quicklink-grid__item">
        <span>LinkedIn</span>
      </div>
      <div class="quicklink-grid__item">
        <span>Contact</span>
      </div>
    </div>
    `;

  // Portfolio Content

  // Skills Content

  // Contact Content

  // Send to UI
  if (windowName === "about") createWindow(aboutPagePath, aboutHTMLContent);
};

const getCurrentTime = function () {
  let currentDate = new Date();
  const currentTime = new Intl.DateTimeFormat("default", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  }).format(currentDate);
  const formattedTime = currentTime.toUpperCase();
  return formattedTime;
};

const getCurrentDate = function () {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", {
    month: "long",
  });
  const formattedDate = `${day} ${month}`;
  return formattedDate;
};

// Initialisation

init();
