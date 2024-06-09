<script lang="ts">
  import { fly } from "svelte/transition";
  import Input from "./Input.svelte";
  import {
    defaultFormMetaData,
    type EditFormMetadata,
  } from "$lib/context/edit-context";
  import type Link from "$lib/interfaces/link";
  import useLinks from "$lib/hooks/use-links";
  import useSections from "$lib/hooks/use-sections";
  import uniqueID from "$lib/utils/unique-id";
    import handleStorage from "$lib/utils/handle-storage";

  export let renderBookmarkModalToggle: () => void;
  export let editMode = false;
  export let data: EditFormMetadata = defaultFormMetaData;

  const { getSectionKeys } = useSections();
  let sec = getSectionKeys()[0];

  const handleSubmit = (e: Event) => {
    const { updateLink, createLink } = useLinks();
    const {saveToStorage} = handleStorage();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newLinkRaw = String(formData.get("link"));
    const newIcon = String(formData.get("icon"));
    const newTitle = String(formData.get("title"));
    const newLink: Link = editMode
      ? ({
          id: Number(formData.get("id")),
          title: newTitle,
          link: newLinkRaw,
          icon: newIcon,
        } as Link)
      : ({
          id: uniqueID(),
          title: newTitle,
          link: newLinkRaw,
          icon: newIcon,
        } as Link);
    if (editMode) {
      if (newLink.id !== undefined)
        updateLink(data.section, newLink.id, newLink);
    } else {
      createLink(sec, newLink);
    }
    saveToStorage();
    renderBookmarkModalToggle();
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
  <input type="text" name="id" value={data.link.id} hidden />
  <Input
    name="title"
    value={data.link.title}
    placeholder="Title..."
    id="title"
  />
  <Input name="icon" value={data.link.icon} placeholder="Icon..." id="icon" />
  <div class="icon__description">
    <span
      >choose an icon from
      <a href="https://www.nerdfonts.com/cheat-sheet">nerdfonts</a>
    </span>
  </div>
  <Input name="link" value={data.link.link} id="link" placeholder="Link..." />

  <div class="selection__wrapper" style={editMode ? "display: none;" : ""}>
    <select name="tag" id="tag" bind:value={sec} class="selection__box">
      {#each getSectionKeys() as key}
        <option value={key}>{key}</option>
      {/each}
    </select>
    <div class="icon__container">
      <i class="nf nf-custom-play_arrow"></i>
    </div>
  </div>

  <div class="modal__button__wrapper">
    <button type="submit"> Send </button>
    <button type="button" on:click={renderBookmarkModalToggle}> cancel </button>
  </div>
</form>

<style>
  .modal__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    width:75%;
    gap: 1em;
    margin-top: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
  .modal__button__wrapper button {
    padding: 0.8em 2em;
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

  .selection__wrapper {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .selection__box {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px solid var(--fg);
    appearance: none;
    height: 3.2rem;
    width: 75%;
    padding-left: 0.2em;
    background-color: var(--crust);
    color: var(--fg);
    font-size: 1.2em;
    border-radius: 0.2em;
  }

  .selection__box:hover {
    cursor: pointer;
  }

  .selection__box:focus {
    outline: none;
    border: 2px solid var(--pink-color);
  }

  .icon__container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    height: 100%;
    right: 25%;
    width: 1em;
    transition-duration: 300ms;
  }

  .selection__box:focus + .icon__container {
    transform: rotate(90deg);
  }

  @media (max-width: 1250px) {
    .modal__form {
      width: 85%;
      height: fit-content;
      padding: 2em 0em;
    }
  }
  @media (min-width: 1440px) {
    .modal__form {
      width: fit-content;
      height: fit-content;
      padding: 2em 1em;
    }
    .icon__container {
      right: 35%;
    }
  }
</style>
