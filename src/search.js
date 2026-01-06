import "./search.css";

const divSearch = document.createElement("div");
const inputSearch = document.createElement("input");
const btnConfirm = document.createElement("button");

divSearch.classList.add("search");
divSearch.append(inputSearch, btnConfirm);
btnConfirm.textContent = "Search";

inputSearch.placeholder = "Search location...";

export function getQuery(queryCb) {
  document.body.append(divSearch);

  btnConfirm.addEventListener("click", () => {
    if (inputSearch.value) {
      queryCb(inputSearch.value);
    }
  });
}
