import { formatTime } from "./utils.js";

const dateElement = document.querySelector("#date span");
const watchElement = document.getElementById("watch");

let date = new Date();
let interval = null;

function setup() {
  setDate(date);
  setTime(date);

  interval = setInterval(loop, 1000);
}

function onShow() {
  setup();
}

function onHidden() {
  clearInterval(interval);
}

// Time Loop
function loop() {
  const current = new Date();

  // Updates time
  if (
    date.getHours() < current.getHours() ||
    date.getMinutes() < current.getMinutes()
  ) {
    setTime(current);
    date = current;
  }

  // Updates date
  if (date.getDay() < current.getDay()) {
    setDate(current);
    date = current;
  }
}

/**
 *
 * DOM FUNCTIONS
 *
 */

// DATE
function setDate(data) {
  dateElement.innerHTML = `
    ${data.getDate()} de
    ${portugueseMonths[data.getMonth() - 1]} de
    ${data.getFullYear()}
  `;
}

// HOURS
function setTime(data) {
  let hour = data.getHours();
  let min = data.getMinutes();
  let m = "AM";

  if (hour > 12) {
    m = "PM";
    hour -= 12;
  }

  watchElement.innerHTML = `
  ${formatTime(hour)}<span id="dots">:</span>${formatTime(min)} ${m}
`;
}

// Constant
const portugueseMonths = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export default {
  setup,
  onHidden,
  onShow,
  linkElement: document.getElementById("clk-link"),
  pageElement: document.getElementById("clock"),
};
