<script lang="ts">
  import WallpaperInput from "./sidebar.components/WallpaperInput.svelte";
  import ThemeDropdown from "./sidebar.components/ThemeDropdown.svelte";
  import ToggleEditMode from "./sidebar.components/ToggleEditMode.svelte";
  export let toggle: () => void;
</script>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <section class="sidebar" on:click|stopPropagation>
    <div class="sidebar__close">
      <button on:click={toggle}>
        <i class="nf nf-cod-close" />
      </button>
    </div>

    <div class="sidebar__component">
      <div class="title__wrapper">
        <h2 class="title">Wallpaper</h2>
      </div>
      <WallpaperInput />
    </div>

    <div class="sidebar__separator"></div>

    <div class="sidebar__component">
      <div class="title__wrapper">
        <h2 class="title">Theme</h2>
      </div>
      <ThemeDropdown />
    </div>

    <div class="sidebar__separator"></div>

    <div class="sidebar__component">
      <div class="title__wrapper">
        <h2 class="title">Edit mode</h2>
      </div>
      <ToggleEditMode />
    </div>
  </section>

<style>
  
  .sidebar {
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    right: 0;
    width: 30%;
    height: 100%;
    background-color: var(--crust);
    transition: right 0.3s ease-in-out;
  }
  .sidebar__component {
    position: relative;
    width: 80%;
    padding: 1em;
    border: 1em var(--fg);
  }
  .sidebar__component h2 {
    text-align: center;
    padding-bottom: 0.225em;
  }
  .sidebar__separator {
    width: 80%;
    height: 0.01em;
    margin: 8px 0;
    background-color: var(--fg);
  }
  .sidebar__close {
    display: flex;
    width: 100%;
    justify-content: end;
  }
  .sidebar__close > button {
    background: none;
    color: var(--fg);
    font-size: 1.425rem;
    padding-top: 0.5rem;
    padding-right: 0.5rem;
  }
  .title__wrapper {
    display: flex;
    justify-content: start;
    font-size: 0.925em;
    padding-bottom: 0.5em;
  }

  .title {
    text-align: start;
    border-bottom: 0.1em solid var(--pink-color);
    border-radius: 0.2em;
  }
  @media (max-width: 1024px) {
    .sidebar {
      width: 70%;
    }
  }

  @media (max-width: 425px) {
    .sidebar {
      width: 100%;
    }
  }
</style>
