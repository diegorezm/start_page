<script lang="ts">
  import { fly } from "svelte/transition";
  import WallpaperInput from "./sidebar.components/WallpaperInput.svelte";
  import ThemeDropdown from "./sidebar.components/ThemeDropdown.svelte";
  import ToggleEditMode from "./sidebar.components/ToggleEditMode.svelte";
  import AddBookmarkButton from "./sidebar.components/AddBookmarkButton.svelte";
  export let renderAddModalToggle: () => void;
  export let toggle: () => void;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<section
  class="sidebar"
  on:click|stopPropagation
  transition:fly={{ x: "100%", y: 0, delay: 0, duration: 250 }}
>
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
      <h2 class="title">Bookmarks</h2>
    </div>

    <div class="bookmarks__wrapper">
      <div>
        <h3 class="subtitle">Edit mode</h3>
        <ToggleEditMode />
      </div>
      <div>
        <h3 class="subtitle">Add bookmark</h3>
        <AddBookmarkButton {renderAddModalToggle}/>
      </div>
    </div>
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
    overflow-y: auto;
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: var(--fg) var(--crust); /* Firefox */
  }
  .sidebar::-webkit-scrollbar {
    width: 0.5em;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background-color: var(--fg);
    border-radius: 5px;
  }

  .sidebar::-webkit-scrollbar-track {
    background-color: var(--base);
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
    font-size: 1.75em;
    padding-bottom: 0.5em;
  }

  .title {
    text-align: start;
    border-bottom: 0.1em solid var(--pink-color);
    border-radius: 0.2em;
  }

  .subtitle {
    text-align: start;
    border-radius: 0.2em;
    margin-top: 0.175em;
    font-size: 1.1em;
  }

  .bookmarks__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1em;
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
