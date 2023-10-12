// Declaración de variables
const url = "https://api.giphy.com/v1/gifs/search";
const urlTrending = "https://api.giphy.com/v1/gifs/trending";
const api_key = "Vn6VxJ5HoVVDzOyQ9om66v84H6kVTeKg";
const limit = "40";

// Captura de elementos del DOM
const btn = document.getElementById("btn-search");
const input = document.getElementById("search");
const spinner = document.getElementById("spinner");

// Eventos
// Búsqueda de que están en tendencia
document.addEventListener("DOMContentLoaded", () => {
  spinner.classList.add("show");
//   parámetros de la url
  let url = `${urlTrending}?api_key=${api_key}&limit=${limit}`;
  fetchData(url);
});

btn.addEventListener("click", () => {
  let search = input.value;
  spinner.classList.remove("hidden");
  spinner.classList.add("show");
  //   parámetros de la url
  let urlComplete = `${url}?api_key=${api_key}&q=${search}&limit=${limit}`;
  fetchData(urlComplete);
});

// Fetch de datos por palabra clave
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    spinner.classList.remove("show");
    spinner.classList.add("hidden");
    showGifts(data);
  } catch (error) {
    console.log(error);
  }
};


// Renderizar los gifs en el DOM
const showGifts = (data) => {
  const container = document.getElementById("container");
  container.innerHTML = "";
  data.data.forEach(({ images }) => {
    const img = document.createElement("img");
    img.src = images.original.url;
    container.appendChild(img);
  });
};
