<script>
  import Container from "../components/Container.svelte";
  import Links from "../components/Links.svelte";
  import Icon from "../components/Icon.svelte";
  import Clock from "../components/Clock.svelte";
  import Actions from "../components/Actions.svelte";

  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const wallpaper = writable();

  const setWallpaper = (url) => {
    wallpaper.set(url);
  }

  setContext('wallpaper', { 
    wallpaper,
    setWallpaper
  })

  export let data;
  const { mydia, com } = data;

  let renderLinks = true;

  const onClick = () => {
    renderLinks = !renderLinks;
  };
</script>

<Container>
  <Clock />
  <Actions />
  <Icon {onClick} />
  {#if renderLinks}
    <section class="links__container">
      <h1 class="links__title">
        <i class="nf nf-cod-file_media" />
        Mydia
      </h1>
      <Links links={mydia} />
      <h1 class="links__title">
        <i class="nf nf-fa-comments_o" />
        Com
      </h1>
      <Links links={com} />
    </section>
  {/if}
</Container>

<style>
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

  .links__title {
    color: var(--pink-color);
    font-size: 2.5em;
    font-weight: 700;
    text-align: center;
    padding: 0.1em;
  }

  @media (min-width: 1440px) {
    .links__container {
      width: 50%;
      height: 40%;
    }
  }
</style>
