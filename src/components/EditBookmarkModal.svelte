<script lang="ts">
  import { Tag, type Links } from "$lib/interfaces";
  import { bookmarks, editFormMetadata } from "$lib/store";
  import { createJsonData, updateBookmark } from "$lib/utils";

  export let renderEditModalToggle: () => void;
  const handleEditSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newLinkRaw = String(formData.get("link"));
    const newIcon = String(formData.get("icon"));
    const newTitle = String(formData.get("title"));
    const newTagRaw = String(formData.get("tag"));
    const newTag: () => Tag = () => {
      if (newTagRaw in Tag) {
        return Tag[newTagRaw as keyof typeof Tag];
      } else {
        return Tag.com;
      }
    };

    const newId = Number(formData.get("id"));
    const newLink: Links = {
      id: newId,
      title: newTitle,
      link: newLinkRaw,
      icon: newIcon,
      tag: newTag(),
    };
    $bookmarks = updateBookmark(newLink);
    createJsonData($bookmarks);
    renderEditModalToggle();
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
  on:submit|preventDefault={handleEditSubmit}
  class="modal__form"
  on:click|stopPropagation
>
  <h1 class="title">Edit</h1>
  <input type="text" name="id" value={$editFormMetadata.id} hidden />
  <input
    type="text"
    name="tag"
    value={$editFormMetadata.tag.toString()}
    hidden
  />
  <input type="text" name="title" value={$editFormMetadata.title} />
  <input type="text" name="icon" value={$editFormMetadata.icon} />
  <div class="icon__description">
    <span
      >choose an icon from
      <a href="https://www.nerdfonts.com/cheat-sheet">nerdfonts</a>
    </span>
  </div>

  <input type="text" name="link" value={$editFormMetadata.link} />
  <div class="modal__button__wrapper">
    <button type="submit"> Send </button>
    <button type="button" on:click={renderEditModalToggle}> cancel </button>
  </div>
</form>

<style>
  .modal__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 60%;
    background-image: var(--gradient-bg);
    background-size: cover;
    background-position: center;
    gap: 1em;
    border-radius: var(--radius);
  }

  .modal__form input {
    color: var(--fg-color);
    padding-left: 0.8em;
    height: 3rem;
    width: 50%;
    background-color: var(--base);
    border: 2px solid var(--fg);
    border-radius: var(--radius);
  }

  .modal__form input:focus {
    outline: none;
    border: 2px solid var(--pink-color);
  }
  .modal__button__wrapper {
    display: flex;
    gap: 1em;
    margin-top: 1em;
    width: 50%;
    height: 10%;
  }
  .modal__button__wrapper button {
    width: 50%;
    border-radius: var(--radius);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .modal__button__wrapper button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .modal__button__wrapper button[type="submit"] {
    background: linear-gradient(var(--pink-color), var(--purple-color));
    font-weight: 700;
  }

  .modal__button__wrapper button[type="button"] {
    background-color: var(--red-color);
    font-weight: 700;
  }

  /* h1 style */
  .title {
    color: var(--pink-color);
    font-size: 2.5em;
    font-weight: 700;
    text-align: center;
    padding: 0.1em;
  }
  .icon__description {
    width: 50%;
    font-size: 0.925em;
  }
  .icon__description a {
    color: var(--purple-color);
  }
  @media (max-width: 1250px) {
    .modal__form {
      width: 75%;
    }
  }
</style>
