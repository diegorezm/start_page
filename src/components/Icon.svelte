<script lang="ts">
  import icon1 from "$lib/icons/icon.png";
  import icon2 from "$lib/icons/icon2.png";
  import icon3 from "$lib/icons/icon3.png";

  export let onClick: () => void;

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomIcon = (index: number) => {
    const icons = [icon1, icon2, icon3];
    return icons[index];
  };

  const iconIndex = random(0, 2);
  const icon = getRandomIcon(iconIndex);
</script>

<div class="img__wrapper">
  <div class="img__border">
    <button type="button" on:click={onClick}>
      <img src={icon} alt={`icon${iconIndex + 1}`} />
    </button>
  </div>
</div>

<style>
  .img__wrapper {
    position: relative;
    display: flex;
    align-self: center;
    justify-content: center;
    width: 100%;
    z-index: 5;
  }

  .img__border {
    background-image: linear-gradient(var(--pink-color), var(--purple-color));
    border-radius: 9999px;
    width: fit-content;
  }

  img {
    width: 8.5rem;
    height: 8.5rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-delay: 300ms;
    border-radius: 9999px;
  }

  button {
    background: none;
  }

  @media (min-width: 1440px) {
    img {
      width: 12rem;
      height: 12rem;
    }
  }

  @media (min-width: 1250px) {
    img:hover {
      transform: rotate(180deg);
      cursor: pointer;
  }

  }
</style>
