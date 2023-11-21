<script>
  import { onMount } from "svelte";

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  let currentTime = getCurrentTime();

  onMount(() => {
    const interval = setInterval(() => {
      currentTime = getCurrentTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="clock__wrapper">
  <i class="nf nf-oct-clock" />
  <span>
    {currentTime}
  </span>
</div>

<style>
  .clock__wrapper {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top:0.5em;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  @media(max-width: 400px){
    .clock__wrapper{
      left: 72%;
    }
  }
</style>
