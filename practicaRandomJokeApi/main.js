const button = document.getElementById("btn");
const container = document.querySelector(".joke p");

button.addEventListener("click", getJoke);
document.addEventListener("DOMContentLoaded", getJoke);

async function getJoke() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const res = await fetch("https://icanhazdadjoke.com/", config);
  const data = await res.json();
  container.innerHTML = data.joke;
}
