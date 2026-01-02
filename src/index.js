import { loadOverview } from "./overview.js";
import { loadDaily } from "./daily.js";
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

getWeatherData("Davao City")
  .then((res) => {
    loadOverview(res);
    loadDaily(res);
  })
  .catch(console.error);
