import bookmarks from "../bookmarks.json"

function renderBookmarks() {
  /** @type HTMLDivElement **/
  const container = document.getElementById("bookmarks")

  Object.entries(bookmarks).forEach(([sectionName, bookmarks]) => {
    const bookmarkContainer = document.createElement("div")
    bookmarkContainer.classList.add("bookmarks__section")
    const title = document.createElement("h1");
    title.className = "bookmarks__title";
    title.textContent = sectionName.toUpperCase();
    bookmarkContainer.appendChild(title);

    // Create list
    const ul = document.createElement("ul");
    ul.className = "bookmarks__list";

    bookmarks.forEach((bm) => {
      const li = document.createElement("li");
      li.className = "bookmark";
      li.innerHTML = `
        <a href="${bm.url}" target="_blank">
          <ion-icon name="${bm.icon}"></ion-icon>
          ${bm.name}
        </a>
      `;
      ul.appendChild(li);
    });

    bookmarkContainer.appendChild(ul);
    container.append(bookmarkContainer)
  });
}

document.addEventListener("DOMContentLoaded", renderBookmarks);
