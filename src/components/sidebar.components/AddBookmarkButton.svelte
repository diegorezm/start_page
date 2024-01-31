<script lang="ts">
  export let renderAddModalToggle: () => void;
</script>

<div class="button__wrapper">
  <button class="bookmark__add__button" on:click={renderAddModalToggle}> bookmark + </button>
</div>

<style>
  .button__wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1em;
    margin-top: 0.5em;
  }
  .bookmark__add__button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px solid var(--fg);
    appearance: none;
    width: 75%;
    height: 2.225em;
    border-radius: 0.2em;
    padding-left: 0.2em;
    background-color: var(--crust);
    color: var(--fg);
    font-size: 1.2em;
  }
  .bookmark__add__button:hover {
    border: 2px solid var(--pink-color);
  }
</style>
