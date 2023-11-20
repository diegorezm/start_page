<script lang="ts">
  import { onMount } from "svelte";
  let container: HTMLDivElement;
  onMount(() => {
    if (container) {
      container.style.backgroundImage =
        "url(https://w.wallhaven.cc/full/1p/wallhaven-1poo61.jpg)";
    }
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
