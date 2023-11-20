<script>
  import { onMount } from "svelte";
  import Container from "../components/Container.svelte";
  import Links from "../components/Links.svelte";
  import Icon from "../components/Icon.svelte";
  import Clock from "../components/Clock.svelte";
  export let data;
  const { mydia, com } = data;

  let renderLinks = true;

  const onClick = () => {
    renderLinks = !renderLinks;
  };

  onMount(() => {
    const theme = localStorage.getItem("theme");
    switch (theme) {
      case "ayu":
        document.body.setAttribute("data-theme", "ayu");
        break;
      case "macchiato":
        document.body.setAttribute("data-theme", "macchiato");
        break;
      default:
        document.body.setAttribute("data-theme", "ayu");
        break;
    }
  });

  function changeTheme() {
    const attr = document.body.getAttribute("data-theme");
    switch (attr) {
      case "ayu":
        document.body.setAttribute("data-theme", "macchiato");
        localStorage.setItem("theme", "macchiato");
        break;
      case "macchiato":
        document.body.setAttribute("data-theme", "ayu");
        localStorage.setItem("theme", "ayu");
        break;
      default:
        document.body.setAttribute("data-theme", "ayu");
        localStorage.setItem("theme", "ayu");
        break;
    }
  }
</script>

<Container>
  <div class="btn__wrapper">
    <button on:click={changeTheme} type="button">theme</button>
  </div>

  <Clock />

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
  .btn__wrapper {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  .btn__wrapper button {
    background: none;
    color: var(--fg);
  }
  .btn__wrapper button:hover {
    color: var(--purple-color);
    cursor: pointer;
  }

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
    box-shadow: 0px 2px 2px var(--pink-color);
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
