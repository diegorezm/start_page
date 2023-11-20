<script lang="ts">
  export let onClick: () => void;

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomIcon = (index: number) => {
    const icons = ["/icons/icon.png", "/icons/icon2.png", "/icons/icon3.png"];
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
    width: 10rem;
    height: 10rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-delay: 300ms;
    border-radius: 9999px;
  }

  button{
    background: none;
  }

  img:hover {
    transform: rotate(180deg);
    cursor: pointer;
  }
  @media (min-width: 1440px) {
    img {
      width: 12rem;
      height: 12rem;
    }
  }
</style>
