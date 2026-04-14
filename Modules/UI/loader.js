export function toggleLoader(show) {
  if (show) {
    const loader = document.createElement("div");
    loader.classList.add("loader");

    loader.innerHTML = `
      <div class="spinner"></div>
      <span>Loading...</span>`;

    document.querySelector(".studentsList").appendChild(loader);
  } else document.querySelector(".loader")?.remove();
}
