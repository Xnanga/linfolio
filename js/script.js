"use: strict";

const init = function () {
  setInterval(updateDate, 1000);
  setInterval(updateTime, 1000);
  setUpEventListeners();

  prepareWindowContent("about");
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

const createWindow = function (pagePath, contentHTML, id) {
  const windowContainer = document.querySelector(".window-container");
  const windowHTML = `<div class="window" data-id="${id}">
    <div class="window__header">
      <div class="window__header-bar">
        <span>${pagePath}</span>
      </div>
      <div class="window__header-btns">
        <img src="icons/minus.png" alt="" class="window-btn minimise-btn">
        <img src="icons/cancel-circle.png" alt="" class="window-btn close-btn">
      </div>
    </div>
    <div class="window__main">
    ${contentHTML}
      </div>
  </div>
    `;

  windowContainer.insertAdjacentHTML("beforeend", windowHTML);

  // Make new window draggable
  const allWindows = document.querySelectorAll(".window");
  const newestWindow = allWindows[allWindows.length - 1];
  dragElement(newestWindow);
};

const createTab = function (tabInfoObj) {
  const tabContainer = document.querySelector(".tab-container");
  const tabHTML = `
  <div id="${tabInfoObj.id}" class="tab tab--active">
    <img src="${tabInfoObj.src}" alt="${tabInfoObj.alt}" class="icon tab__icon" />
    <span class="tab__label">${tabInfoObj.text}</span>
    <img src="icons/cancel-circle.png" alt="" class="icon tab__cross">
  </div>
  `;
  tabContainer.insertAdjacentHTML("beforeend", tabHTML);
};

const removeTab = function (removedWindow) {
  let tabIdentifier = removedWindow.dataset.id;
  const allTabs = document.querySelectorAll(".tab");

  allTabs.forEach((tab) => {
    if (tab.id.includes(tabIdentifier)) tab.outerHTML = "";
  });
};

const expandCard = function (clickedBtn) {
  const activeCard = clickedBtn.closest(".card");
  const expandableContent = activeCard.querySelector(".card__content");
  expandableContent.classList.toggle("card__content--expanded");

  clickedBtn.textContent === "[+]"
    ? (clickedBtn.textContent = "[-]")
    : (clickedBtn.textContent = "[+]");
};

// Events

const topBarEventHandler = function (e) {
  const clickedEl = e.target;
  const topBar = document.querySelector(".top-strip");
  if (clickedEl === topBar) return;

  // Close Window & Tab
  if (clickedEl.classList.contains("tab__cross")) {
    let activeWindow;
    const parentTab = clickedEl.closest(".tab");
    const identifier = parentTab.id;
    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach((window) =>
      identifier.includes(window.dataset.id) ? (activeWindow = window) : window
    );
    if (activeWindow) {
      removeTab(activeWindow);
      closeWindow(activeWindow);
    }
  }
};

const sideBarEventHandler = function (e) {
  const clickedEl = e.target;
  const sideBar = document.querySelector(".side-menu");
  if (clickedEl === sideBar) return;

  if (clickedEl.id === "about") prepareWindowContent("about");
  if (clickedEl.id === "portfolio") prepareWindowContent("portfolio");
  if (clickedEl.id === "skills") prepareWindowContent("skills");
  if (clickedEl.id === "contact") prepareWindowContent("contact");
};

const windowClickEventHandler = function (e) {
  const clickedEl = e.target;

  // Close Window & Tab
  if (clickedEl.classList.contains("close-btn")) {
    const activeWindow = clickedEl.closest(".window");
    removeTab(activeWindow);
    closeWindow(activeWindow);
  }

  // Minimise Window
  if (clickedEl.classList.contains("minimise-btn")) {
    const activeWindow = clickedEl.closest(".window");
    minimiseWindow(activeWindow);
  }

  // Quicklink buttons
  if (clickedEl.id === "portfolio-btn") prepareWindowContent("portfolio");
  if (clickedEl.id === "skills-btn") prepareWindowContent("skills");
  if (clickedEl.id === "contact-btn") prepareWindowContent("contact");

  // Card expand buttons
  if (clickedEl.classList.contains("card__expand-btn")) expandCard(clickedEl);
};

const windowMouseDownEventHandler = function (e) {
  const clickedEl = e.target;

  // Push active window to front
  switchWindowZIndex(clickedEl.closest(".window"));
};

const setUpEventListeners = function () {
  const topbar = document.querySelector(".top-strip");
  const sidebar = document.querySelector(".side-menu");
  const windowContainer = document.querySelector(".window-container");

  topbar.addEventListener("click", topBarEventHandler);
  sidebar.addEventListener("click", sideBarEventHandler);
  windowContainer.addEventListener("click", windowClickEventHandler);
  windowContainer.addEventListener("mousedown", windowMouseDownEventHandler);
};

// Logic

const prepareWindowContent = function (windowName) {
  // Check for Existing Windows
  const windowOpen = checkWindowExists(windowName);

  // About Content
  const aboutPagePath = `\\home\\jamie\\about`;
  const aboutHTMLContent = `<h1>Hi there! I'm Jamie Peutherer</h1>
    <p>I'm a self-taught frontend web developer with a strong background in technical Search Engine Optimisation (7+ years in the field!).</p>
    <p>I like to build all sorts of odd websites and apps, especially webapp recreations of other tools and programs (<strong>like Ubuntu Linux!</strong>)</p>
    <p>I'm still learning more and more about good web development every day (<i>Who doesn't have more to learn?</i>), but I'm eager to jump right into a professional role real soon.</p>
    <p>You can find quick links to the most important stuff below - otherwise, feel free to click around and explore.</p>
    <div class="quicklink-grid">
      <div class="quicklink-grid__item" id="cv-btn">
        <span>CV</span>
      </div>
      <div class="quicklink-grid__item" id="portfolio-btn">
        <span>Portfolio</span>
      </div>
      <div class="quicklink-grid__item" id="skills-btn">
        <span>Skills</span>
      </div>
      <a href="https://github.com/Xnanga" target="_blank">
      <div class="quicklink-grid__item" id="github-btn">
        <span>Github</span>
      </div>
      </a>
      <a href="https://www.linkedin.com/in/jamiepeutherer/" target="_blank">
        <div class="quicklink-grid__item" id="linkedin-btn">
          <span>LinkedIn</span>
        </div>
      </a>
      <div class="quicklink-grid__item" id="contact-btn">
        <span>Contact</span>
      </div>
    </div>
    `;

  // Portfolio Content
  const portfolioPagePath = `\\home\\jamie\\portfolio`;
  const portfolioHTMLContent = `<h1>Portfolio</h1>
    <p>Below are some of the projects I've put together that I think showcase what I can do best. You can find even more over on my Github page.</p>
    <div class="card-container">
      <div class="card">
      <div class="card__title">
        <h2>PropertySearchr: Responsive Modern Website Homepage</h2>
        <button class="card__expand-btn">[+]</button>
      </div>
        <span class="card__tools">HTML, SASS, Vanilla JS</span>
        <div class="card__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Donec et imperdiet est, ut bibendum mauris. Pellentesque in ligula mollis, viverra est eu, bibendum augue.</p>
          <p>Vivamus interdum, sapien sit amet feugiat venenatis, leo mauris tempus justo, ut fermentum nisl odio at metus. </p>
          <p>Nullam nunc ex, laoreet vitae eros a, ullamcorper fermentum metus. Aliquam ut orci nec diam pretium mattis in ac justo. </p>
          <p>Integer non arcu semper, porta ipsum non, tristique elit. Aliquam viverra neque id tincidunt mattis. </p>
        </div>
      </div>
      <div class="card">
      <div class="card__title">
        <h2>PropertySearchr: Responsive Modern Website Homepage</h2>
        <button class="card__expand-btn">[+]</button>
      </div>
        <span class="card__tools">HTML, SASS, Vanilla JS</span>
        <div class="card__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Donec et imperdiet est, ut bibendum mauris. Pellentesque in ligula mollis, viverra est eu, bibendum augue.</p>
          <p>Vivamus interdum, sapien sit amet feugiat venenatis, leo mauris tempus justo, ut fermentum nisl odio at metus. </p>
          <p>Nullam nunc ex, laoreet vitae eros a, ullamcorper fermentum metus. Aliquam ut orci nec diam pretium mattis in ac justo. </p>
          <p>Integer non arcu semper, porta ipsum non, tristique elit. Aliquam viverra neque id tincidunt mattis. </p>
        </div>
      </div>
      <div class="card">
      <div class="card__title">
        <h2>PropertySearchr: Responsive Modern Website Homepage</h2>
        <button class="card__expand-btn">[+]</button>
      </div>
        <span class="card__tools">HTML, SASS, Vanilla JS</span>
        <div class="card__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Donec et imperdiet est, ut bibendum mauris. Pellentesque in ligula mollis, viverra est eu, bibendum augue.</p>
          <p>Vivamus interdum, sapien sit amet feugiat venenatis, leo mauris tempus justo, ut fermentum nisl odio at metus. </p>
          <p>Nullam nunc ex, laoreet vitae eros a, ullamcorper fermentum metus. Aliquam ut orci nec diam pretium mattis in ac justo. </p>
          <p>Integer non arcu semper, porta ipsum non, tristique elit. Aliquam viverra neque id tincidunt mattis. </p>
        </div>
      </div>
      <div class="card">
      <div class="card__title">
        <h2>PropertySearchr: Responsive Modern Website Homepage</h2>
        <button class="card__expand-btn">[+]</button>
      </div>
        <span class="card__tools">HTML, SASS, Vanilla JS</span>
        <div class="card__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Donec et imperdiet est, ut bibendum mauris. Pellentesque in ligula mollis, viverra est eu, bibendum augue.</p>
          <p>Vivamus interdum, sapien sit amet feugiat venenatis, leo mauris tempus justo, ut fermentum nisl odio at metus. </p>
          <p>Nullam nunc ex, laoreet vitae eros a, ullamcorper fermentum metus. Aliquam ut orci nec diam pretium mattis in ac justo. </p>
          <p>Integer non arcu semper, porta ipsum non, tristique elit. Aliquam viverra neque id tincidunt mattis. </p>
        </div>
      </div>
      <div class="card">
      <div class="card__title">
        <h2>PropertySearchr: Responsive Modern Website Homepage</h2>
        <button class="card__expand-btn">[+]</button>
      </div>
        <span class="card__tools">HTML, SASS, Vanilla JS</span>
        <div class="card__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Donec et imperdiet est, ut bibendum mauris. Pellentesque in ligula mollis, viverra est eu, bibendum augue.</p>
          <p>Vivamus interdum, sapien sit amet feugiat venenatis, leo mauris tempus justo, ut fermentum nisl odio at metus. </p>
          <p>Nullam nunc ex, laoreet vitae eros a, ullamcorper fermentum metus. Aliquam ut orci nec diam pretium mattis in ac justo. </p>
          <p>Integer non arcu semper, porta ipsum non, tristique elit. Aliquam viverra neque id tincidunt mattis. </p>
        </div>
      </div>
    </div>
    `;

  // Skills Content
  const skillsPagePath = `\\home\\jamie\\skills-tools`;
  const skillsHTMLContent = `<h1>My Skills & Tools I'm Familiar With</h1>
    <p>TEST</p>
    `;

  // Contact Content
  const contactPagePath = `\\home\\jamie\\contact`;
  const contactHTMLContent = `<h1>Get in Touch</h1>
    <p>TEST</p>
    `;

  // Send to UI
  if (windowName === "about" && windowOpen === false) {
    createWindow(aboutPagePath, aboutHTMLContent, "about");
    prepareTabContent(windowName);
  }

  if (windowName === "portfolio" && windowOpen === false) {
    createWindow(portfolioPagePath, portfolioHTMLContent, "portfolio");
    prepareTabContent(windowName);
  }

  if (windowName === "skills" && windowOpen === false) {
    createWindow(skillsPagePath, skillsHTMLContent, "skills");
    prepareTabContent(windowName);
  }

  if (windowName === "contact" && windowOpen === false) {
    createWindow(contactPagePath, contactHTMLContent, "contact");
    prepareTabContent(windowName);
  }

  // Push window to front
  const allActiveWindows = document.querySelectorAll(".window");
  const newestWindow = allActiveWindows[allActiveWindows.length - 1];
  switchWindowZIndex(newestWindow);
};

const prepareTabContent = function (windowName) {
  const tabIndex = ["about", "portfolio", "skills", "contact"];
  const tabValues = [
    {
      src: "icons/361-user.png",
      text: "About Me",
      alt: "User Icon",
      id: "about-tab",
    },
    {
      src: "icons/246-folder.png",
      text: "My Portfolio",
      alt: "Folder Icon",
      id: "portfolio-tab",
    },
    {
      src: "icons/165-layers.png",
      text: "My Skills",
      alt: "Tech Stack Icon",
      id: "skills-tab",
    },
    {
      src: "icons/356-paper plane.png",
      text: "Contact Me",
      alt: "Paper Plane Icon",
      id: "contact-tab",
    },
  ];
  const tabIndexNumber = tabIndex.indexOf(windowName);
  createTab(tabValues[tabIndexNumber]);
};

const checkWindowExists = function (windowName) {
  let flag = false;
  const allWindows = document.querySelectorAll(".window");
  allWindows.forEach((window) => {
    if (window.dataset.id === windowName) flag = true;
  });

  return flag;
};

const closeWindow = (activeWindow) => (activeWindow.outerHTML = "");

const minimiseWindow = function (activeWindow) {
  console.log(`This window will be minimised: ${activeWindow}`);
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

const switchWindowZIndex = function (activeWindow) {
  const allWindows = document.querySelectorAll(".window");

  allWindows.forEach((window) => {
    window === activeWindow
      ? window.classList.add("window--active")
      : window.classList.remove("window--active");
  });
};

function dragElement(el) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (el.querySelector(".window__header")) {
    // if present, the header is where you move the DIV from:
    el.querySelector(".window__header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Initialisation

init();
