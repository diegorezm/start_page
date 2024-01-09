<script lang="ts">
  export let isRendered: boolean;
</script>

<div class={`modal__container ${isRendered ? "active" : ""}`}>
  <slot />
</div>

<style>
  .modal__container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
  }

  .modal__container.active {
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
  }

  .moda__btn__close {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.425rem;
    z-index: 20;
  }
</style>
