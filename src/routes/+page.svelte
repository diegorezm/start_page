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
  import { isImageURL, isURL } from "../helpers";

  // conditional rendering
  let renderLinks = true;
  const renderLinksToggle = () => {
    renderLinks = !renderLinks;
  };

  let renderModal = false;
  const renderModalToggle = () => {
    renderModal = !renderModal;
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

  // links data
  export let data;
  const { mydia, com } = data;

  // handle form
  const handleSubmit = (e: Event) => {
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

  const handleDelete = () => {
    localStorage.removeItem("wallpaper");
    errorMsg = "";
    setWallpaper("");
    renderModalToggle();
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
      <form on:submit|preventDefault={handleSubmit} class="wallpaper__form">
        <h1 class="title">Wallpaper</h1>
        <input type="text" name="url" placeholder="wallpaper url..." />
        {#if errorMsg}
          <div class="error__wrapper">
            <span>{errorMsg}</span>
          </div>
        {/if}
        <div class="wallpaper__button__wrapper">
          <button type="submit"> Send </button>
          <button type="button" on:click={handleDelete}> Remove </button>
        </div>
      </form>
    </Modal>
  {/if}
  <Clock />
  <Actions onClick={renderModalToggle} />
  <Icon onClick={renderLinksToggle} />
  {#if renderLinks}
    <section class="links__container">
      <h1 class="title">
        <i class="nf nf-cod-file_media" />
        Mydia
      </h1>
      <Links links={mydia} />
      <h1 class="title">
        <i class="nf nf-fa-comments_o" />
        Com
      </h1>
      <Links links={com} />
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
  .wallpaper__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 50%;
    background-image: var(--gradient-bg);
    background-size: cover;
    background-position: center;
    gap: 1em;
    border-radius: var(--radius);
  }
  .wallpaper__form input {
    color: var(--fg-color);
    padding-left: 0.8em;
    height: 3rem;
    width: 50%;
    background-color: var(--base);
    border: 2px solid var(--fg);
    border-radius: var(--radius);
  }

  .wallpaper__form input:focus {
    outline: none;
    border: 2px solid var(--pink-color);
  }
  .wallpaper__button__wrapper {
    display: flex;
    gap: 1em;
    margin-top: 1em;
    width: 50%;
    height: 10%;
  }
  .wallpaper__button__wrapper button {
    width: 50%;
    border-radius: var(--radius);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .wallpaper__button__wrapper button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .wallpaper__button__wrapper button[type="submit"] {
    background: linear-gradient(var(--pink-color), var(--purple-color));
    font-weight: 700;
  }

  .wallpaper__button__wrapper button[type="button"] {
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

@media (min-width: 1440px) {
  .links__container {
      width:60%;
      height:40%;
    }
}
  @media (max-width: 1250px) {
    .links__container {
      width:80%;
    }
    .wallpaper__form {
      width: 75%;
    }
  }

  @media (max-width: 768px) {
    .links__container {
      width:90%;
      flex-direction:column;
      height: fit-content;
      gap: 0.5rem;
      padding:0.5rem;
    }
  }

</style>
