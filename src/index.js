import { domOverview, updateOverview } from "./overview.js";
import { domDaily, updateDaily } from "./daily.js";
import { domSearch, onQuery } from "./search.js";
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

document.body.classList.add("initial");
document.body.append(domSearch);

onQuery((query) => {
  getWeatherData(query)
    .then((res) => {
      updateOverview(res);
      updateDaily(res);
    })
    .catch(console.error);
});
onQuery(() => {
  document.body.append(domOverview, domDaily);
  document.body.classList.remove("initial");
}, true);
