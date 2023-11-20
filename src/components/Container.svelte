<div class="container">
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
    background-image: url("https://w.wallhaven.cc/full/1p/wallhaven-1poo61.jpg");
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
