<script lang="ts">
  import { fly } from "svelte/transition";
  import { Tag, type Links } from "$lib/interfaces";
  import { bookmarks, editFormMetadata } from "$lib/store";
  import { createJsonData, updateBookmark, createBookMark } from "$lib/utils";
  import Input from "./Input.svelte";

  export let renderBookmarkModalToggle: () => void;
  export let editMode = false;
  export let data: Links = {
    id: 0,
    title: "",
    link: "",
    icon: "",
    tag: Tag.com,
  };

  const handleSubmit = (e: Event) => {
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

    const newLink: Links = editMode
      ? ({
          id: Number(formData.get("id")),
          title: newTitle,
          link: newLinkRaw,
          icon: newIcon,
          tag: newTag(),
        } as Links)
      : ({
          title: newTitle,
          link: newLinkRaw,
          icon: newIcon,
          tag: newTag(),
        } as Links);
    data = newLink;
    $bookmarks = editMode ? updateBookmark(data) : createBookMark(data);
    createJsonData($bookmarks);
    renderBookmarkModalToggle();
    $editFormMetadata = {
      id: 0,
      title: "",
      link: "",
      icon: "",
      tag: Tag.com,
    };
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
  on:submit|preventDefault={handleSubmit}
  class="modal__form"
  on:click|stopPropagation
  transition:fly={{ x: 0, y: 50 }}
>
  <h1 class="title">{editMode ? "Edit bookmark" : "New bookmark"}</h1>
  <input type="text" name="id" value={data.id} hidden />
  <Input name="title" value={data.title} placeholder="Title..." id="title" />
  <Input name="icon" value={data.icon} placeholder="Icon..." id="icon" />
  <div class="icon__description">
    <span
      >choose an icon from
      <a href="https://www.nerdfonts.com/cheat-sheet">nerdfonts</a>
    </span>
  </div>
  <Input name="link" value={data.link} id="link" placeholder="Link..."/>
  <Input
    type="text"
    name="tag"
    value={data.tag.toString()}
    hidden={editMode ? true : false}
    placeholder="Tag..."
    id="tag"
  />
  <div class="modal__button__wrapper">
    <button type="submit"> Send </button>
    <button type="button" on:click={renderBookmarkModalToggle}> cancel </button>
  </div>
</form>

<style>
  .modal__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 70%;
    z-index: 20;
    background-image: var(--gradient-bg);
    background-size: cover;
    background-position: center;
    gap: 0.5em;
    border-radius: var(--radius);
    transition:
      top 0.4s,
      opacity 0.4s;
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
    height: 100%;
    border-radius: var(--radius-button);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .modal__button__wrapper button:hover {
    cursor: pointer;
    transform: scale(1.06);
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
