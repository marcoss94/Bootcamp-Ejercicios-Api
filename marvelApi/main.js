const PUBLIC_KEY = "5e3dd6b8b12d9354bd247a8412732059";
const PRIVATE_KEY = "619d1956c178cebfee1d8b0a7a0a8910c1fa9bba";
const BASE_URL = "https://gateway.marvel.com/v1/public";
let cant = 20;
let page = 0;

const container = document.querySelector(".results");
const spinner = document.getElementById("spinner");
const prev = document
  .getElementById("prev")
  .addEventListener("click", prevPage);
const next = document
  .getElementById("next")
  .addEventListener("click", nextPage);

document.addEventListener("DOMContentLoaded", () => {
  spinner.classList.add("show");
  getList();
});

async function getList() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const ts = new Date().getTime();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  const url = `${BASE_URL}/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&offset=${page}`;
  const res = await fetch(url, config);
  const data = await res.json();
  spinner.classList.remove("show");
  spinner.classList.add("hidden");
  let output = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
  data.data.results.forEach(({ name, thumbnail }) => {
    output += `
      <article>
        <h2>${name}</h2>
        <img src="${thumbnail.path}.${thumbnail.extension}" alt="${name}">
      </article>
    `;
  });
  container.innerHTML = output;
}

function nextPage() {
  spinner.classList.remove("hidden");
  spinner.classList.add("show");
  page += cant;
  getList();
}

function prevPage() {
  if (page !== 0) {
    spinner.classList.remove("hidden");
    spinner.classList.add("show");
    page -= cant;
    getList();
  }
}
