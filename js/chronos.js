import { formatTime } from "./utils.js";

const startElement = document.getElementById("start");
const timeElement = document.getElementById("time");
const smallElement = document.getElementById("small");

const time = {
  hour: 0,
  min: 0,
  sec: 0,
  small: 0,
};

let interval = null;
let lastTime = 0;
let aux = 0;
let isRunning = false;

function setup() {
  startElement.onclick = () => {
    if (isRunning) return;

    isRunning = true;
    startCount();
  };
}

function onShow() {}

function onHidden() {}

// Util functions
function startCount(dt = 0) {
  dt = (dt / 10) | 0;
  aux = dt;

  time.small = aux % 100;
  aux = (aux / 100) | 0;

  time.sec = aux % 60;
  aux = (aux / 60) | 0;

  time.min = aux % 60;
  aux = (aux / 60) | 0;

  time.hour += aux % 60;
  aux = (aux / 60) | 0;

  timeElement.innerHTML = `${formatTime(time.hour)}:${formatTime(
    time.min
  )}:${formatTime(time.sec)}`;
  smallElement.innerHTML = `${formatTime(time.small)}`;

  interval = requestAnimationFrame(startCount.bind(this));
}

function stopCount() {
  clearInterval(interval);
  isRunning = false;
}

function resetCount() {}

export default {
  setup,
  onHidden,
  onShow,
  linkElement: document.getElementById("chr-link"),
  pageElement: document.getElementById("chronos"),
};
