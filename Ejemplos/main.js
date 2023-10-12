const BASE_URL = "https://icanhazdadjoke.com/";

document.addEventListener("DOMContentLoaded", () => getJoke());

const button = document.getElementById("btn");
const container = document.querySelector(".container p");

button.addEventListener("click", getJoke);

async function getJoke() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const res = await fetch(BASE_URL, config);
  const data = await res.json();
  container.innerHTML = data.joke;
}
