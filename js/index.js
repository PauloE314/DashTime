import clock from "./clock.js";
import chronos from "./chronos.js";

const menuElement = document.getElementById("menu-icon");
const asideElement = document.querySelector("aside");
const locationElement = document.getElementById("location");

let isMenuOpen = false;
let enableMenuChange = true;
let currentPage;

const animationTime = 500;

function main() {
  setLocation();

  clock.setup();
  chronos.setup();

  menuElement.innerHTML = `<span></span>\n`.repeat(3);
  menuElement.onclick = handleMenuClick;

  clock.linkElement.onclick = () => handleMenuItemClick(clock);
  chronos.linkElement.onclick = () => handleMenuItemClick(chronos);

  clock.linkElement.click();
}

// Menu
function handleMenuClick() {
  if (enableMenuChange) {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      enableMenuChange = false;
      asideElement.style.opacity = 1;
      asideElement.style.animation = `AppearHorizontal ${animationTime}ms`;
      setTimeout(() => {
        asideElement.style.animation = "";
        enableMenuChange = true;
      }, animationTime);
    } else {
      enableMenuChange = false;
      asideElement.style.animation = `AppearHorizontal ${animationTime}ms reverse`;
      setTimeout(() => {
        asideElement.style.animation = "";
        asideElement.style.opacity = 0;
        enableMenuChange = true;
      }, animationTime);
    }
  }
}

// Handles menu item change
function handleMenuItemClick(next) {
  const prev = currentPage;

  if (prev && prev !== next) {
    prev.linkElement.classList.remove("selected");
    prev.pageElement.classList.remove("show");
    prev.onHidden();
  }

  next.linkElement.classList.add("selected");
  next.pageElement.classList.add("show");
  next.onShow();

  currentPage = next;
}

// Location label
function setLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
      );

      const { address } = await response.json();
      const UF = UFList[address.state];

      locationElement.innerHTML = `${address.town}`;
      locationElement.innerHTML += UF ? ` (${UF})` : "";
    });
  }
}

const UFList = {
  Acre: "AC",
  Alagoas: "AL",
  Amapá: "AP",
  Amazonas: "AM",
  Bahia: "BA",
  Ceará: "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  Goiás: "GO",
  Maranhão: "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  Pará: "PA",
  Paraíba: "PB",
  Paraná: "PR",
  Pernambuco: "PE",
  Piauí: "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  Rondônia: "RO",
  Roraima: "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  Sergipe: "SE",
  Tocantins: "TO",
};

window.addEventListener("load", (e) => main());
