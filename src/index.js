import "./index.css";
import "./reset.css";

const VC_KEY = "KGX6UFJV28G2DRT4M4XHNBWTL";

const divOverview = document.querySelector(".overview");
const pLocation = divOverview.querySelector(".location");
const pConditionCurrent = divOverview.querySelector(".condition");
const imgIcon = divOverview.querySelector(".icon");
const pTempCurrent = divOverview.querySelector(".temp");

async function getWeatherData(location) {
  const data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${VC_KEY}`,
  );
  if (!data.ok) {
    throw new Error(`${data.status}: ${data.statusText}`);
  }

  return data.json();
}

function loadOverview(data) {
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
  pTempCurrent.textContent = Math.round(((temp - 32) * 5) / 9) + "°C";
}

getWeatherData("Davao City").then(loadOverview).catch(console.error);
