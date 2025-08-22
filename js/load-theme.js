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
