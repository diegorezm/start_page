<script lang="ts">
  import { onMount } from "svelte";
  export let renderModalToggle: () => void;
  export let editMode: boolean;
  let dropdownText = "";
  let showDropdown = false;

  onMount(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.setAttribute("data-theme", theme);
      dropdownText = theme;
    } else {
      document.body.setAttribute("data-theme", "ayu");
      dropdownText = "ayu";
    }
  });

  function getChosenTheme(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const chosenTheme = button.textContent;
    if (chosenTheme) {
      changeTheme(chosenTheme.toLowerCase());
      dropdownText = chosenTheme;
    }
    showHidenDropdown();
  }

  function changeTheme(theme: string) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function showHidenDropdown() {
    showDropdown = !showDropdown;
  }
</script>

<div class="btn__wrapper">
  <button on:click={() => (editMode = !editMode)} type="button">
    <i class="nf nf-cod-edit"></i>
    edit
  </button>
  <div class="dropdown">
    <button class="dropdown__btn" on:click={showHidenDropdown}
      >{dropdownText}</button
    >
    {#if showDropdown}
      <div class="dropdown__content">
        <button on:click={getChosenTheme}>Ayu</button>
        <button on:click={getChosenTheme}>Macchiato</button>
      </div>
    {/if}
  </div>

  <button on:click={renderModalToggle} type="button">wallpaper</button>
</div>

<style>
  .btn__wrapper {
    display: none;
    top: 0.5em;
    right: 1em;
    align-items: center;
    justify-content: center;
    gap: 1em;
    font-size: 1.2em;
  }

  .btn__wrapper button {
    background: none;
    display: hidden;
    color: var(--fg);
    margin-left: 0.375rem;
  }

  .btn__wrapper button:hover {
    color: var(--purple-color);
    cursor: pointer;
  }

  .dropdown__content {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 0.2em;
    padding: 1em;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--crust);
    border-radius: 1em;
  }

  .dropdown__content button {
    width: 100%;
  }

  @media (min-width: 575px) {
    .btn__wrapper {
      display: flex;
      position: absolute;
    }
  }
</style>
