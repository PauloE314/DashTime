const menuElement = document.getElementById("menu-icon");
const asideElement = document.querySelector("aside");
const tempElement = document.querySelector("#temp span");
const dateElement = document.querySelector("#date span");
const clockElement = document.getElementById("clock");
const locationElement = document.getElementById("location");

let date = new Date();
let menuOpen = false;
let enableMenuChange = true;
let update;

// Main event
window.addEventListener("load", (e) => {
  setDate(date);
  setTime(date);
  setLocation();

  update = setInterval(() => {
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
  }, 1000);

  menuElement.innerHTML = `<span></span>\n`.repeat(3);
});

// Menu
menuElement.addEventListener("click", () => {
  if (enableMenuChange) {
    menuOpen = !menuOpen;

    if (menuOpen) {
      enableMenuChange = false;
      asideElement.style.opacity = 1;
      asideElement.style.animation = "Appear 1s";
      setTimeout(() => {
        asideElement.style.animation = "";
        enableMenuChange = true;
      }, 1000);
    } else {
      enableMenuChange = false;
      asideElement.style.animation = "";
      asideElement.style.animation = "Appear 1s reverse";
      setTimeout(() => {
        asideElement.style.animation = "";
        asideElement.style.opacity = 0;
        enableMenuChange = true;
      }, 1000);
    }
  }
});

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

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;

  clockElement.innerHTML = `
  ${hour}<span id="dots">:</span>${min} ${m}
`;
}

// CITY and STATE
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

// Constants
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
