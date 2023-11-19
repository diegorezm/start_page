<script>
  import Container from "../components/Container.svelte";
  import Links from "../components/Links.svelte";
  export let data;
  const { mydia, com } = data;
</script>

<Container>
  <Links links={mydia} />
  <Links links={com} />
</Container>
