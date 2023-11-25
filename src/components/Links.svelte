<script lang="ts">
  import type { Links } from "../interfaces/Links";
  export let links: Links[];
</script>

<ul class="list">
  {#each links as link}
    <li class="link__wrapper">
      <a href={link.link} target="_blank">
        <i class={`nf ${link.icon}`} />
        {link.title}
      </a>
    </li>
  {/each}
</ul>

<style>
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2em;
    font-size: 2rem;
  }
  li:hover,
  a:hover {
    color: var(--purple-color);
  }

  @media (max-width: 768px) {
    .list {
      flex-direction: column;
      gap: 1em;
      padding: 0.5em;
      align-items: center;
    }
  }
</style>
