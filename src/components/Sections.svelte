<script lang="ts">
  import { editMode, editFormMetadata } from "../lib/context/edit-context";
  import type Link from "$lib/interfaces/link";
  import useLinks from "$lib/hooks/use-links";
  export let links: Link[];
  export let title: string;
  export let icon: string;
  export let renderBookmarkModalToggle: () => void;
  function handleEditFormClick(bookmark: Link) {
    $editFormMetadata = {section: title, link: bookmark};
    renderBookmarkModalToggle();
  }

  function handleDeleteButtonClick(linkId: number | undefined) {
    if(linkId === undefined) return;
    const { deleteLink } = useLinks();
    deleteLink(title, linkId);
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
              on:click={() => handleDeleteButtonClick(link.id)}
            >
              <i class="nf nf-cod-trash"></i>
            </button>
            <button
              class="edit__mode__btn"
              on:click={() => handleEditFormClick(link)}
            >
              <i class="nf nf-cod-edit"></i>
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
    justify-content: center;
    align-items: center;
    gap: 1.2em;
    width: 100%;
  }
  .list__wrapper {
    display: flex;
    flex-direction: row;
    gap: 1.4em;
    font-size: 2rem;
  }
  .title {
    color: var(--pink-color);
    font-size: 2.5em;
    font-weight: 700;
    text-align: center;
  }
  li:hover,
  .edit__mode__btn:hover,
  a:hover {
    color: var(--purple-color);
  }
  .edit__mode__div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 0.625em;
    padding: 0.1em;
    gap: 0.5em;
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
