import { convertToCelsius } from "./utility.js";
import { generateHourlyView } from "./hourly.js";
import "./daily.css";

export function loadDaily(data) {
  const { days } = data;

  const root = document.createElement("ul");
  root.classList.add("daily");

  let dayElements = [];

  for (const day of days) {
    const date = new Date(day.datetimeEpoch * 1000);
    const {
      icon,
      description,
      temp: tempavg,
      tempmin,
      tempmax,
      conditions,
    } = day;

    const dayContainer = document.createElement("li");

    const divDateMonth = document.createElement("div");
    const pMonth = document.createElement("p");
    const pDate = document.createElement("p");
    divDateMonth.append(pMonth, pDate);

    const divTexts = document.createElement("div");
    const pCondition = document.createElement("p");
    const pDescription = document.createElement("p");
    divTexts.append(pCondition, pDescription);

    const imgIcon = document.createElement("img");

    const divTemps = document.createElement("div");
    const pTempAvg = document.createElement("p");
    const pTempMin = document.createElement("p");
    const pTempMax = document.createElement("p");
    const spanTempAvgLabel = document.createElement("span");
    const spanTempMinMaxLabel = document.createElement("span");

    const btnBack = document.createElement("button");
    btnBack.classList.add("back");

    divTemps.append(
      spanTempAvgLabel,
      pTempAvg,
      spanTempMinMaxLabel,
      pTempMax,
      pTempMin,
    );

    pDate.textContent = date.getDate().toString().padStart(2, "0");
    pMonth.textContent = new Intl.DateTimeFormat(navigator.language, {
      month: "long",
    })
      .format(date.getMonth())
      .toLocaleUpperCase();

    pCondition.textContent = conditions;
    pDescription.textContent = description;

    spanTempAvgLabel.textContent = "AVERAGE";
    spanTempMinMaxLabel.textContent = "MIN / MAX";
    pTempAvg.append(convertToCelsius(tempavg) + "°");
    pTempMin.append(convertToCelsius(tempmin) + "°");
    pTempMax.append(convertToCelsius(tempmax) + "°");
    btnBack.append("←   Back");

    import(`./assets/${icon}.svg`)
      .then((file) => {
        imgIcon.src = file.default;
      })
      .catch(alert);

    dayContainer.classList.add("day");

    divDateMonth.classList.add("date-month");
    pMonth.classList.add("month");
    pDate.classList.add("date");

    imgIcon.classList.add("icon");

    divTexts.classList.add("texts");
    pCondition.classList.add("condition");
    pDescription.classList.add("description");

    divTemps.classList.add("temps");
    pTempAvg.classList.add("temp-avg");
    pTempMin.classList.add("temp-min");
    pTempMax.classList.add("temp-max");

    function addHourly() {
      const hourlyView = generateHourlyView(day.hours);
      root.replaceChildren(btnBack, this, hourlyView);
    }
    function returnDaily() {
      root.replaceChildren(...dayElements);
    }
    dayContainer.addEventListener("click", addHourly);
    btnBack.addEventListener("click", returnDaily);

    dayElements.push(dayContainer);
    dayContainer.append(divDateMonth, imgIcon, divTexts, divTemps);
    root.append(dayContainer);
  }

  document.body.append(root);
}
