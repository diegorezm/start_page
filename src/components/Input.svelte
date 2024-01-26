<script lang="ts">
  export let hasLabel = false;
  export let type = "text";
  export let name = "name";
  export let placeholder = "";
  export let id: string;
  export let value: string;
  export let onChange: () => void = () => {};
</script>

<div class="input__wrapper">
  {#if hasLabel}
    <label for={id}>{name}:</label>
  {/if}
  <input
    {type}
    {name}
    {id}
    {placeholder}
    {value}
    on:change={onChange}
  />
</div>

<style>
  .input__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.7rem;
    gap: 0.2em;
  }
  input {
    color: var(--fg-color);
    padding-left: 0.8em;
    height: 3.2rem;
    width: 50%;
    background-color: var(--base);
    border: 2px solid var(--fg);
    border-radius: var(--radius);
  }
  input:focus {
    outline: none;
    border: 2px solid var(--pink-color);
  }
  .input__wrapper label {
    text-align: left;
    width: 50%;
    font-size: 1.175em;
  }
</style>
