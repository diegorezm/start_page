<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Wallpaper } from "../interfaces/Wallpaper";
  const wallpaper: Wallpaper = getContext("wallpaper");
  wallpaper.setWallpaper("https://w.wallhaven.cc/full/5g/wallhaven-5gpv25.jpg");

  onMount(() => {
    const theme = localStorage.getItem("theme");
    switch (theme) {
      case "ayu":
        document.body.setAttribute("data-theme", "ayu");
        break;
      case "macchiato":
        document.body.setAttribute("data-theme", "macchiato");
        break;
      default:
        document.body.setAttribute("data-theme", "ayu");
        break;
    }
  });

  function changeTheme() {
    const attr = document.body.getAttribute("data-theme");
    switch (attr) {
      case "ayu":
        document.body.setAttribute("data-theme", "macchiato");
        localStorage.setItem("theme", "macchiato");
        break;
      case "macchiato":
        document.body.setAttribute("data-theme", "ayu");
        localStorage.setItem("theme", "ayu");
        break;
      default:
        document.body.setAttribute("data-theme", "ayu");
        localStorage.setItem("theme", "ayu");
        break;
    }
  }
</script>

<div class="btn__wrapper">
  <button on:click={changeTheme} type="button">theme</button>
  <input type="text" name="wallpaper_link" id="wallpaper_link" />
</div>

<style>
  .btn__wrapper {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  .btn__wrapper button {
    background: none;
    color: var(--fg);
  }
  .btn__wrapper button:hover {
    color: var(--purple-color);
    cursor: pointer;
  }
</style>
