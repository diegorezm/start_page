<script lang="ts">
  import type { Links } from "../lib/interfaces";
  export let links: Links[];
  export let title: string;
  export let icon: string;
</script>

<ul class="list">
  <div class="title__wrapper">
    <h1 class="title">
      <i class={`nf ${icon}`}/>
      {title}
    </h1>
  </div>
  <div class="list__wrapper">
    {#each links as link}
      <li>
        <a href={link.link} target="_blank">
          <i class={`nf ${link.icon}`} />
          {link.title}
        </a>
      </li>
    {/each}
  </div>
</ul>

<style>
  .list {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 2em;
  }
  .list__wrapper {
    display: flex;
    flex-direction: row;
    gap: 2em;
    font-size: 2rem;
  }
  .title {
    color: var(--pink-color);
    font-size: 2.5em;
    font-weight: 700;
    text-align: center;
    padding: 0.1em;
  }
  li:hover,
  a:hover {
    color: var(--purple-color);
  }

  @media (max-width: 768px) {
    .list {
      gap: 1em;
    }
    .list__wrapper {
      flex-direction: column;
      align-items: center;
      gap: 0.825em;
      padding:0.625em;
    }
  }
</style>
