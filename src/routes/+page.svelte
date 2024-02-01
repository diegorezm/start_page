<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Container from "../components/Container.svelte";
  import Links from "../components/Links.svelte";
  import Icon from "../components/Icon.svelte";
  import Clock from "../components/Clock.svelte";
  import Modal from "../components/Modal.svelte";
  import { loadBookmark } from "$lib/utils";
  import { editFormMetadata, userWallpaper } from "$lib/store";
  import type { PageData } from "./$types";
  import { bookmarks } from "$lib/store";
  import Sidebar from "../components/Sidebar.svelte";
  import BookmarksModal from "../components/BookmarksModal.svelte";

  export let data: PageData;

  $bookmarks = loadBookmark(data);

  let renderLinks = true;
  const renderLinksToggle = () => {
    renderLinks = !renderLinks;
  };

  let showSidebar = false;
  let showSidebarToggle = () => {
    showSidebar = !showSidebar;
  };

  let renderBookmarkModal = false;
  let renderBookmarkModalToggle = () => {
    renderBookmarkModal = !renderBookmarkModal;
  };

  let renderEditBookmarkModal = false;

  let renderEditBookmarkModalToggle = () => {
    renderEditBookmarkModal = !renderEditBookmarkModal;
  };

  onMount(() => {
    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedWallpaper) {
      $userWallpaper = savedWallpaper;
    }
  });
</script>

<Container>
  <div class="showsidebar">
    <button class="showsidebar__btn" on:click={showSidebarToggle}>
      <i class="nf nf-seti-config"></i>
    </button>
  </div>
  {#if showSidebar}
    <Modal isRendered={showSidebar} toggle={showSidebarToggle}>
      <Sidebar
        toggle={showSidebarToggle}
        renderAddModalToggle={renderBookmarkModalToggle}
      />
    </Modal>
  {/if}

  {#if renderBookmarkModal}
    <Modal isRendered={renderBookmarkModal} toggle={renderBookmarkModalToggle}>
      <BookmarksModal {renderBookmarkModalToggle} />
    </Modal>
  {/if}

  {#if renderEditBookmarkModal}
    <Modal isRendered={renderEditBookmarkModal} toggle={renderEditBookmarkModalToggle}>
      <BookmarksModal renderBookmarkModalToggle={renderEditBookmarkModalToggle} editMode={true} data={$editFormMetadata}/>
    </Modal>
  {/if}

  <Clock />
  <Icon onClick={renderLinksToggle} />
  {#if renderLinks}
    <section
      class="links__container"
      transition:fly={{ x: 0, y: 100, duration: 400 }}
    >
      <Links
        links={$bookmarks.mydia}
        title={"mydia"}
        icon={"nf-cod-file_media"}
        renderBookmarkModalToggle={renderEditBookmarkModalToggle}
      />
      <Links
        links={$bookmarks.com}
        title={"com"}
        icon={"nf-fa-comments_o"}
        renderBookmarkModalToggle={renderEditBookmarkModalToggle}
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

  .showsidebar {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 10;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-delay: 300ms;
  }
  .showsidebar__btn {
    font-size: 2rem;
    background: none;
    color: var(--foreground);
  }
  .showsidebar:hover {
    transform: rotate(90deg);
    cursor: pointer;
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
