/** @type HTMLDivElement **/
const clockContainer = document.getElementById("clock")

setInterval(time, 1000)

function time() {
  var d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const clock = h + ":" + m
  clockContainer.innerHTML = clock
}
