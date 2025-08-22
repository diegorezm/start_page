import bookmarks from "../bookmarks.json"

/** @type HTMLDivElement **/
const clockContainer = document.getElementById("clock")

/** @type HTMLButtonElement **/
const themeChanger = document.getElementById("theme_changer")

const themeIcon = document.getElementById("theme_icon")

loadTheme()

themeChanger.addEventListener("click", function() {
  const currentTheme = loadTheme()
  if (currentTheme === "light") {
    setTheme("dark")
  } else {
    setTheme("light")
  }
})

setInterval(time, 1000)
document.addEventListener("DOMContentLoaded", renderBookmarks);

/** @param {"light" | "dark"} theme **/
function setTheme(theme) {
  localStorage.setItem("theme", theme)
  loadTheme()
}

/** @returns "light" | "dark" Returns the current theme **/
function loadTheme() {
  /** @type {"light" | "dark"} theme**/
  const theme = localStorage.getItem("theme") ?? "light"
  themeIcon.setAttribute("name", theme === "dark" ? "moon-outline" : "partly-sunny-outline")
  document.documentElement.setAttribute("data-theme", theme)
  return theme
}

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

function time() {
  var d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const clock = h + ":" + m
  clockContainer.innerHTML = clock
}
