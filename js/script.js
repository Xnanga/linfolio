"use: strict";

// Variables

const init = function () {
  setInterval(updateDate, 1000);
  setInterval(updateTime, 1000);
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

// Logic

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
