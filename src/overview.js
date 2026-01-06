import { convertToCelsius } from "./utility.js";
import "./overview.css";

const divOverview = document.querySelector(".overview");
const pLocation = divOverview.querySelector(".location");
const pConditionCurrent = divOverview.querySelector(".condition");
const imgIcon = divOverview.querySelector(".icon");
const pTempCurrent = divOverview.querySelector(".temp");

export function loadOverview(data) {
  const { resolvedAddress } = data;
  const { conditions, icon, temp } = data.currentConditions;
  pLocation.textContent = resolvedAddress;
  pConditionCurrent.textContent = conditions;

  import(`./assets/${icon}.svg`)
    .then((file) => {
      imgIcon.src = file.default;
    })
    .catch(alert);

  // Have to convert from Fahrenheit to Celsuis then round it to integer
  pTempCurrent.textContent = convertToCelsius(temp) + "°C";
}
