<script lang="ts">
  import { onDestroy } from "svelte";
  import { isImageURL, isURL } from "$lib/helpers/urlHelper";
  import { userWallpaper } from "$lib/store";
  let errorMsg: string | null;
  let wallpaper: string;

  const handleWallpaperSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    if (!isURL(wallpaper)) {
      errorMsg = "Please provide a valid url.";
      return;
    }
    if (!isImageURL(wallpaper)) {
      errorMsg = "Please provide a valid image.";
      return;
    }
    if (wallpaper) {
      $userWallpaper = wallpaper;
      localStorage.setItem("wallpaper", wallpaper);
      errorMsg = "";
      form.reset();
    }
  };

  const handleWallpaperDelete = () => {
    localStorage.removeItem("wallpaper");
    errorMsg = "";
    wallpaper = "";
    $userWallpaper = null;
  };

  onDestroy(() => {
    errorMsg = null;
  });
</script>

<form on:submit|preventDefault={handleWallpaperSubmit} id="wallpaper__form">
  <input
    type="text"
    name="url"
    placeholder="wallpaper url..."
    bind:value={wallpaper}
  />
  {#if errorMsg}
    <div class="error__wrapper">
      <span>{errorMsg}</span>
    </div>
  {/if}
  <div class="form__button__wrapper">
    <button type="submit"> Send </button>
    <button type="button" on:click={handleWallpaperDelete}> Remove </button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.5em;
  }
  input {
    display: block;
    width: 100%;
    color: var(--fg-color);
    background-color: var(--base);
    border: 2px solid var(--fg);
    border-radius: 0.2em;
    height: 2.225em;
    font-size: 1.225em;
    padding-left: 0.2em;
  }

  input:focus {
    outline: none;
    border: 2px solid var(--pink-color);
  }
  .form__button__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .error__wrapper {
    display: flex;
    width: 100%;
    color: var(--red-color);
    font-size: 1.225em;
  }
  .form__button__wrapper button {
    width: 40%;
    border-radius: 0.2em;
    height: 2.225em;
    font-weight: 700;
    color: var(--crust);
  }
  .form__button__wrapper button[type="button"] {
    background-color: var(--red-color);
  }
  .form__button__wrapper button[type="submit"] {
    background: linear-gradient(var(--pink-color), var(--purple-color));
  }
</style>
