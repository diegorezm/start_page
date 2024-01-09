<script lang="ts">
  import { onMount } from "svelte";
  let selected: string;
  type Theme = {
    name: string;
    theme: string;
  };
  const themes: Theme[] = [
    {
      name: "Ayu",
      theme: "ayu",
    },
    {
      name: "Macchiato",
      theme: "macchiato",
    },
  ];
  function handleThemeChange(event: Event) {
    const selector = event.target as HTMLSelectElement;
    const choosenTheme = selector.value;
    if (choosenTheme) {
      changeTheme(choosenTheme);
    }
  }
  function changeTheme(theme: string) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  onMount(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.setAttribute("data-theme", theme);
      selected = theme;
    } else {
      document.body.setAttribute("data-theme", "ayu");
      selected = "ayu";
    }
  });
</script>

<!-- TODO: move from <select/> to a proper selection box because this looks horrible-->
<div class="select__wrapper">
  <select class="select__box" on:change={handleThemeChange} bind:value={selected}>
    {#each themes as theme }
      <option value={theme.theme}>{theme.name}</option> 
    {/each}
  </select>
  <div class="icon__container">
    <i class="nf nf-custom-play_arrow"></i>
  </div>
</div>

<style>
  .select__wrapper{
    display:flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .select__box{
    display:flex;
    justify-content: center;
    align-items:center;
    text-align: center;
    border:2px solid var(--fg);
    appearance:none;
    width:75%;
    height: 2.225em;
    border-radius:0.2em;
    padding-left:0.2em;
    background-color:var(--crust);
    color:var(--fg);
    font-size:1.2em;
  }

  .select__box:hover{
    cursor:pointer;
  }

  .icon__container{
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    position:absolute;
    height:100%;
    right:35%;
    width:1em;
    transition-duration:300ms;
  }

  .select__box:focus{
    outline:none;
    border:2px solid var(--pink-color);
  } 

  .select__box:focus + .icon__container{
    transform:rotate(90deg);
  }
</style>
