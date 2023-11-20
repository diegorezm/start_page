<script lang="ts">
  export let toggle: () => void;
</script>

<div class="modal__container">
  <div>
    <button on:click={toggle}>x</button>
  </div>
  <slot />
</div>

<style>
  .modal__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
