<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { onMount, onDestroy } from "svelte";

  import Container from "../components/Container.svelte";
  import Links from "../components/Links.svelte";
  import Icon from "../components/Icon.svelte";
  import Clock from "../components/Clock.svelte";
  import Actions from "../components/Actions.svelte";
  import Modal from "../components/Modal.svelte";
  import { isImageURL, isURL } from "../lib/helpers/urlHelper";
  import { createJsonData, loadBookmark, updateBookmark } from "$lib/utils";
  import { editFormMetadata } from "$lib/store";
  import type { PageData } from "./$types";
  import type { Links as LinkInterface } from "../lib/interfaces";
  import { bookmarks } from "$lib/store";
  import { Tag } from "$lib/interfaces";

  // links data
  export let data: PageData;

  // load json
  $bookmarks = loadBookmark(data);

  // conditional rendering
  let renderLinks = true;
  const renderLinksToggle = () => {
    renderLinks = !renderLinks;
  };
  // wallpaper modal
  let renderModal = false;
  const renderModalToggle = () => {
    renderModal = !renderModal;
  };
  // edit modal
  let renderEditModal = false;
  const renderEditModalToggle = () => {
    renderEditModal = !renderEditModal;
  };

  // context
  const wallpaper = writable();
  const setWallpaper = (url: string) => {
    wallpaper.set(url);
  };
  setContext("wallpaper", {
    wallpaper,
    setWallpaper,
  });

  let errorMsg: string | null;

  // handle wallpaper form
  const handleWallpaperSubmit = (e: Event) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newWallpaper = String(formData.get("url"));
    if (!isURL(newWallpaper)) {
      errorMsg = "Please provide a valid url.";
      return;
    }
    if (!isImageURL(newWallpaper)) {
      errorMsg = "Please provide a valid image.";
      return;
    }
    if (newWallpaper) {
      setWallpaper(newWallpaper);
      localStorage.setItem("wallpaper", newWallpaper);
      renderModalToggle();
      errorMsg = "";
      form.reset();
    }
  };

  const handleWallpaperDelete = () => {
    localStorage.removeItem("wallpaper");
    errorMsg = "";
    setWallpaper("");
    renderModalToggle();
  };

  // handle edit form
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
    const newLink: LinkInterface = {
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

  onMount(() => {
    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  });

  onDestroy(() => {
    errorMsg = null;
  });
</script>

<Container>
  {#if renderModal}
    <Modal toggle={renderModalToggle} {renderModal}>
      <form
        on:submit|preventDefault={handleWallpaperSubmit}
        class="modal__form"
      >
        <h1 class="title">Wallpaper</h1>
        <input type="text" name="url" placeholder="wallpaper url..." />
        {#if errorMsg}
          <div class="error__wrapper">
            <span>{errorMsg}</span>
          </div>
        {/if}
        <div class="modal__button__wrapper">
          <button type="submit"> Send </button>
          <button type="button" on:click={handleWallpaperDelete}>
            Remove
          </button>
        </div>
      </form>
    </Modal>
  {/if}
  {#if renderEditModal}
    <Modal toggle={renderEditModalToggle} renderModal={renderEditModal}>
      <form on:submit|preventDefault={handleEditSubmit} class="modal__form">
        <h1 class="title">Edit</h1>
        <input type="text" name="id" value={$editFormMetadata.id} hidden />
        <input type="text" name="tag" value={$editFormMetadata.tag.toString()} hidden />
        <input type="text" name="title" value={$editFormMetadata.title} />
        <input type="text" name="icon" value={$editFormMetadata.icon} />
        <div class="icon__description">
          <span>choose an icon from 
            <a href="https://www.nerdfonts.com/cheat-sheet">nerdfonts</a>
            </span>
        </div>

        <input type="text" name="link" value={$editFormMetadata.link} />
        <div class="modal__button__wrapper">
          <button type="submit"> Send </button>
          <button type="button" on:click={renderEditModalToggle}>
            cancel
          </button>
        </div>
      </form>
    </Modal>
  {/if}
  <Clock />
  <Actions {renderModalToggle} />
  <Icon onClick={renderLinksToggle} />
  {#if renderLinks}
    <section class="links__container">
      <Links
        links={$bookmarks.mydia}
        title={"mydia"}
        icon={"nf-cod-file_media"}
        {renderEditModalToggle}
      />
      <Links
        links={$bookmarks.com}
        title={"com"}
        icon={"nf-fa-comments_o"}
        {renderEditModalToggle}
      />
    </section>
  {/if}
</Container>

<style>
  /* main container styles */
  .links__container {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 60%;
    height: 50%;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    border: 1px solid var(--pink-color);
    border-radius: var(--radius);
    background-image: var(--gradient-bg);
  }

  .links__container:hover {
    box-shadow: 0px 4px 4px var(--pink-color);
  }

  /* modal styles */
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

  /* error style */
  .error__wrapper {
    width: 50%;
  }
  .error__wrapper span {
    color: var(--red-color);
  }

  /* h1 style */
  .title {
    color: var(--pink-color);
    font-size: 2.5em;
    font-weight: 700;
    text-align: center;
    padding: 0.1em;
  }
  .icon__description{
    width: 50%;
    font-size: 0.925em;
  }
  .icon__description a{
    color:var(--purple-color);
  }
  
  @media (min-width: 1440px) {
    .links__container {
      width: 60%;
      height: 40%;
    }
  }
  @media (max-width: 1250px) {
    .links__container {
      width: 80%;
    }
    .modal__form {
      width: 75%;
    }
  }

  @media (max-width: 768px) {
    .links__container {
      width: 90%;
      flex-direction: column;
      height: fit-content;
      gap: 0.5rem;
      padding: 0.5rem;
    }
  }
</style>
