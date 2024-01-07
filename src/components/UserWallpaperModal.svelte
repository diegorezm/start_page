<script lang="ts">
  import { onDestroy } from "svelte";
  import { isImageURL, isURL } from "$lib/helpers/urlHelper";
  import { userWallpaper } from "$lib/store";
  export let renderWallpaperModalToggle: () => void;

  let errorMsg: string | null;
  // handle wallpaper form
  const handleWallpaperSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newWallpaper = String(formData.get("url"));
    if (!isURL(newWallpaper)) {
      errorMsg = "Please provide a valid url.";
      return;
    }
    if (!isImageURL(newWallpaper)) {
      errorMsg = "Please provide a valid image.";
      return;
    }
    if (newWallpaper) {
      $userWallpaper = newWallpaper;
      localStorage.setItem("wallpaper", newWallpaper);
      renderWallpaperModalToggle();
      errorMsg = "";
      form.reset();
    }
  };

  const handleWallpaperDelete = () => {
    localStorage.removeItem("wallpaper");
    errorMsg = "";
    $userWallpaper = null;
    renderWallpaperModalToggle();
  };

  onDestroy(() => {
    errorMsg = null;
  });
</script>

<form on:submit|preventDefault={handleWallpaperSubmit} class="modal__form">
  <h1 class="title">Wallpaper</h1>
  <input type="text" name="url" placeholder="wallpaper url..." />
  {#if errorMsg}
    <div class="error__wrapper">
      <span>{errorMsg}</span>
    </div>
  {/if}
  <div class="modal__button__wrapper">
    <button type="submit"> Send </button>
    <button type="button" on:click={handleWallpaperDelete}> Remove </button>
  </div>
</form>
