<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Container from "../components/Container.svelte";
  import Sections from "../components/Sections.svelte";
  import Icon from "../components/Icon.svelte";
  import Clock from "../components/Clock.svelte";
  import Modal from "../components/Modal.svelte";
  import type { PageData } from "./$types";
  import Sidebar from "../components/Sidebar.svelte";
  import BookmarksModal from "../components/BookmarksModal.svelte";
  import useSections from "$lib/hooks/use-sections";
  import sections from "$lib/context/section-context";
  import { editFormMetadata } from "$lib/context/edit-context";
  import useWallpaper from "$lib/hooks/use-wallpaper";

  export let data: PageData;

  const { loadSections, getSectionKeys } = useSections();
  const { loadWallpaper } = useWallpaper();

  $sections = loadSections(data.sections);

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
    loadWallpaper();
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
    <Modal
      isRendered={renderEditBookmarkModal}
      toggle={renderEditBookmarkModalToggle}
    >
      <BookmarksModal
        renderBookmarkModalToggle={renderEditBookmarkModalToggle}
        editMode={true}
        data={$editFormMetadata}
      />
    </Modal>
  {/if}

  <Clock />
  <Icon onClick={renderLinksToggle} />
  {#if renderLinks}
    <section
      class="links__container"
      transition:fly={{ x: 0, y: 100, duration: 400 }}
    >
      {#each getSectionKeys() as key}
        <Sections
          links={$sections[key].links}
          title={$sections[key].title}
          icon={$sections[key].icon}
          renderBookmarkModalToggle={renderEditBookmarkModalToggle}
        />
      {/each}
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
    gap: 1.225rem;
    width: fit-content;
    height: fit-content;
    padding: 2.25em 5em;
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
