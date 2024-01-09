<script lang="ts">
  import { onMount } from "svelte";
  let selected;
  function handleThemeChange(event: Event) {
    const selector = event.target as HTMLSelectElement;
    const choosenTheme = selector.value;
    if(choosenTheme){
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

<select on:change={handleThemeChange}  id="theme__selector" bind:value={selected}>
  <option value="ayu">Ayu</option>
  <option value="macchiato">Mcchiato</option>
</select>
