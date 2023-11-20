<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Wallpaper } from "../interfaces/Wallpaper";

  const wallpaper: Wallpaper = getContext("wallpaper");
  let container: HTMLDivElement;
  let url: string;

  const updateBackground = (value: string) => {
    url = value;
    if (container && url) {
      container.style.backgroundImage = `url(${url})`;
    }
  };



  const unsubscribe = wallpaper.wallpaper.subscribe(updateBackground);

  onMount(() => {
    if (container && url) {
      container.style.backgroundImage = `url(${url})`;
    }
  });
  onDestroy(() => {
    unsubscribe();
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
    background-color: var(--base);
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
