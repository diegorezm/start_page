<script lang="ts">
  import { onMount } from "svelte";

  import Container from "../components/Container.svelte";
  import Links from "../components/Links.svelte";
  import Icon from "../components/Icon.svelte";
  import Clock from "../components/Clock.svelte";
  import Actions from "../components/Actions.svelte";
  import Modal from "../components/Modal.svelte";
  import { loadBookmark } from "$lib/utils";
  import { userWallpaper } from "$lib/store";
  import type { PageData } from "./$types";
  import { bookmarks } from "$lib/store";
  import EditBookmarkModal from "../components/EditBookmarkModal.svelte";
  import UserWallpaperModal from "../components/UserWallpaperModal.svelte";

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
  let renderWallpaperModal = false;
  const renderWallpaperModalToggle = () => {
    renderWallpaperModal = !renderWallpaperModal;
  };
  // edit modal
  let renderEditModal = false;
  const renderEditModalToggle = () => {
    renderEditModal = !renderEditModal;
  };

  onMount(() => {
    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) {
      $userWallpaper = savedWallpaper;
    }
  });
</script>

<Container>
  {#if renderWallpaperModal}
    <Modal
      toggle={renderWallpaperModalToggle}
      renderModal={renderWallpaperModal}
    >
      <UserWallpaperModal {renderWallpaperModalToggle} />
    </Modal>
  {/if}
  {#if renderEditModal}
    <Modal toggle={renderEditModalToggle} renderModal={renderEditModal}>
      <EditBookmarkModal {renderEditModalToggle} />
    </Modal>
  {/if}
  <Clock />
  <Actions renderModalToggle={renderWallpaperModalToggle} />
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
