<script lang="ts">
  import type { Links } from "../interfaces/Links";
  export let links: Links[];
</script>

<ul class="list">
{#each links as link}
  <li class="link__wrapper">
    <h1>
      <i class={`nf ${link.icon}`}/>
      <a href={link.link} target="_blank">{link.title}</a>
    </h1>
  </li>    
{/each}
</ul>
