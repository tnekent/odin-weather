import { convertToCelsius } from "./utility.js";
import "./overview.css";

const divOverview = document.createElement("div");
divOverview.classList.add("overview");

const headerLoc = document.createElement("div");
const pLocSubtitle = document.createElement("header");
const pLocName = document.createElement("p");
pLocSubtitle.textContent = "Current weather at";
headerLoc.append(pLocSubtitle, pLocName);
headerLoc.classList.add("header");
pLocName.classList.add("location");

const imgIcon = document.createElement("img");
imgIcon.classList.add("icon");

const divWeatherText = document.createElement("div");
const pTempCurrent = document.createElement("p");
const pConditionCurrent = document.createElement("p");
const spanSeparator = document.createElement("span");
divWeatherText.classList.add("weather-text");
pTempCurrent.classList.add("temp");
pConditionCurrent.classList.add("condition");
spanSeparator.classList.add("separator");
divWeatherText.append(pTempCurrent, spanSeparator, pConditionCurrent);

divOverview.append(headerLoc, imgIcon, divWeatherText);

function updateOverview(data) {
  const { resolvedAddress } = data;
  const { conditions, icon, temp } = data.currentConditions;
  pLocName.textContent = resolvedAddress;
  pConditionCurrent.textContent = conditions;

  import(`./assets/${icon}.svg`)
    .then((file) => {
      imgIcon.src = file.default;
    })
    .catch(alert);

  // Have to convert from Fahrenheit to Celsuis then round it to integer
  pTempCurrent.textContent = convertToCelsius(temp) + "°C";
}

export { divOverview as domOverview, updateOverview };
