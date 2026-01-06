import { loadOverview } from "./overview.js";
import { loadDaily } from "./daily.js";
import { getQuery } from "./search.js";
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
getQuery((query) => {
  getWeatherData(query)
    .then((res) => {
      document.body.classList.remove("initial");
      loadOverview(res);
      loadDaily(res);
    })
    .catch(console.error);
});
