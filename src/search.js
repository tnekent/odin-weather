import "./search.css";

const divSearch = document.createElement("div");
const inputSearch = document.createElement("input");
const btnConfirm = document.createElement("button");

divSearch.classList.add("search");
divSearch.append(inputSearch, btnConfirm);
btnConfirm.textContent = "Search";

inputSearch.placeholder = "Search location...";

function onQuery(queryCb, once = false) {
  btnConfirm.addEventListener(
    "click",
    () => {
      if (inputSearch.value) {
        queryCb(inputSearch.value);
      }
    },
    { once },
  );
}

export { divSearch as domSearch, onQuery };
