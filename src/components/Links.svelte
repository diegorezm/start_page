<script lang="ts">
  import { bookmarks, editMode } from "../lib/store";
  import type { Links } from "../lib/interfaces";
  import { editFormMetadata } from "../lib/store";
  import { deleteBookmark } from "$lib/utils";
  export let links: Links[];
  export let title: string;
  export let icon: string;
  export let renderEditModalToggle: () => void;
  function handleEditFormClick(bookmark: Links) {
    $editFormMetadata = bookmark;
    renderEditModalToggle();
  }
  function handleDeleteButtonClick(bookmark: Links) {
    $bookmarks = deleteBookmark(bookmark);
    // TODO: add a way for the user to add bookarms, until then i can´t really delete them.
    // createJsonData($bookmarks);
  }
</script>

<ul class="list">
  <div class="title__wrapper">
    <h1 class="title">
      <i class={`nf ${icon}`} />
      {title}
    </h1>
  </div>
  <div class="list__wrapper">
    {#each links as link}
      <li>
        <a href={link.link} target="_blank">
          <i class={`nf ${link.icon}`} />
          {link.title}
        </a>
        {#if $editMode}
          <div class="edit__mode__div">
            <button
              class="edit__mode__btn"
              on:click={() => handleDeleteButtonClick(link)}
            >
              <i class="nf nf-cod-trash"></i>
              delete
            </button>
            <button
              class="edit__mode__btn"
              on:click={() => handleEditFormClick(link)}
            >
              <i class="nf nf-cod-edit"></i>
              edit
            </button>
          </div>
        {/if}
      </li>
    {/each}
  </div>
</ul>

<style>
  .list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 2em;
  }
  .list__wrapper {
    display: flex;
    flex-direction: row;
    gap: 2em;
    font-size: 2rem;
  }
  .title {
    color: var(--pink-color);
    font-size: 2.5em;
    font-weight: 700;
    text-align: center;
    padding: 0.1em;
  }
  li:hover,
  .edit__mode__btn:hover,
  a:hover {
    color: var(--purple-color);
  }
  .edit__mode__div {
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-size: 0.625em;
    padding: 0.1em;
  }
  .edit__mode__btn {
    display: block;
    color: var(--fg);
    background: none;
  }
  @media (min-width: 1440px) {
    .list__wrapper {
      font-size: 2.5em;
    }
  }
  @media (max-width: 768px) {
    .list {
      gap: 1em;
    }
    .list__wrapper {
      flex-direction: column;
      align-items: center;
      gap: 0.825em;
      padding: 0.525em;
    }
  }
</style>
