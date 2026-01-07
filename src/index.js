import { domOverview, updateOverview } from "./overview.js";
import { domDaily, updateDaily } from "./daily.js";
import { domSearch, onQuery } from "./search.js";
import "./index.css";
import "./reset.css";

const VC_KEY = "KGX6UFJV28G2DRT4M4XHNBWTL";

async function getWeatherData(location) {
  const data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${VC_KEY}`,
  );
  if (!data.ok) {
    throw new Error(`${data.status}: ${data.statusText}`);
  }

  return data.json();
}

const pLoadingText = document.createElement("p");
pLoadingText.classList.add("loading");
pLoadingText.textContent = "Loading...";

document.body.classList.add("initial");
document.body.append(domSearch);

onQuery((query) => {
  document.body.replaceChildren(domSearch, pLoadingText);
  getWeatherData(query)
    .then((res) => {
      updateOverview(res);
      updateDaily(res);
      document.body.replaceChildren(domSearch, domOverview, domDaily);
    })
    .catch(alert);
});
onQuery(() => {
  document.body.classList.remove("initial");
}, true);
