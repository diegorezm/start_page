<script lang="ts">
  import { userWallpaper } from "$lib/store";
  import { onDestroy } from "svelte";

  let container: HTMLDivElement;

  const updateBackground = (wallpaper: string | null) => {
    container.style.backgroundImage = wallpaper
      ? `url(${wallpaper})`
      : "var(--gradient-bg)";
  };
  
  const unsub = userWallpaper.subscribe((wallpaper) => {
    if (container) {
      updateBackground(wallpaper);
    }
  });
  onDestroy(() => {
    unsub();
  });
</script>

<div class="container" bind:this={container}>
  <div class="hidden__container" />
  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    color: var(--fg);
    background-position: center;
    background-size: cover;
  }

  .hidden__container {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
  }
</style>
