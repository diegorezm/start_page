<script lang="ts">
  import { editMode } from "../lib/store";
  import type { Links } from "../lib/interfaces";
  import { editFormMetadata } from "../lib/store";
  export let links: Links[];
  export let title: string;
  export let icon: string;
  export let renderEditModalToggle: () => void;
  function handleEditFormClick(bookmark: Links) {
    $editFormMetadata = bookmark;
    renderEditModalToggle();
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
          <button class="edit__btn" on:click={() => handleEditFormClick(link)}>
            <i class="nf nf-cod-edit"></i>
            edit
          </button>
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
  .edit__btn:hover,
  a:hover {
    color: var(--purple-color);
  }
  .edit__btn {
    display: block;
    color: var(--fg);
    background: none;
    font-size: 0.625em;
    width: 100%;
    text-align: end;
  }
  @media (max-width: 768px) {
    .list {
      gap: 1em;
    }
    .list__wrapper {
      flex-direction: column;
      align-items: center;
      gap: 0.825em;
      padding: 0.625em;
    }
  }
</style>
