import bookmarks from "./bookmarks.json";
import { parseHTML } from "linkedom";
import { mkdir, writeFile, rm, rename } from "node:fs/promises";
import { basename, join } from "node:path";
import html from "./index.html" with {type: "text"}

const distDir = join(import.meta.dir, "dist");
const tempIndexFile = join(import.meta.dir, "out.html");

const { document } = parseHTML(html);

function renderBookmarks() {
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

renderBookmarks()

try {
  await mkdir(distDir, { recursive: true })
  await writeFile(tempIndexFile, document.toString(), "utf-8");

  await Bun.build({
    entrypoints: [tempIndexFile],
    minify: true,
    outdir: distDir,
    splitting: false,
    naming: "[name].[ext]"
  })


  await rm(tempIndexFile)
  const tempName = basename(tempIndexFile);
  await rename(join(distDir, tempName), join(distDir, "index.html"));

} catch (error) {
  console.error("❌ Build failed:", error);
  process.exit(1);
}

