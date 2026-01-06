import { convertToCelsius } from "./utility.js";
import "./hourly.css";

export function generateHourlyView(hoursData) {
  const ulRoot = document.createElement("ul");
  ulRoot.classList.add("hourly");

  for (const hourData of hoursData) {
    const { icon, conditions, temp } = hourData;
    const hour = new Date(hourData.datetimeEpoch * 1000).getHours();
    let hour12Format = hour % 12 || 12; // If hour = 0, turn it to 12 (AM)
    let meridian = hour < 12 ? "AM" : "PM";
    console.log(hour);

    const liContainer = document.createElement("li");
    liContainer.classList.add("row");

    const pTime = document.createElement("p");
    const spanHour = document.createElement("span");
    const spanMeridian = document.createElement("span");
    pTime.classList.add("time");
    spanHour.classList.add("hour");
    spanMeridian.classList.add("meridian");
    spanHour.append(hour12Format.toString().padStart(2, "0"));
    spanMeridian.append(meridian);
    pTime.append(spanHour, spanMeridian);

    import(`./assets/${icon}.svg`)
      .then((file) => {
        imgIcon.src = file.default;
      })
      .catch(alert);

    const imgIcon = document.createElement("img");
    imgIcon.classList.add("icon");

    const pCondition = document.createElement("p");
    pCondition.classList.add("condition");
    pCondition.textContent = conditions;

    const pTemps = document.createElement("p");
    pTemps.classList.add("temp");
    pTemps.textContent = Math.round(convertToCelsius(temp)).toString() + "°";

    liContainer.append(pTime, imgIcon, pCondition, pTemps);
    ulRoot.append(liContainer);
  }

  return ulRoot;
}
