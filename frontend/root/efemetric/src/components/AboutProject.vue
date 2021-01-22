<template>
  <div class="navibar">
    <a id="About"> </a>
    <h2 style="font-size:vw">About</h2>
    <h3> {{ title }}</h3>
    <p>{{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutProject",
  props: {
    msg: String,
    title: String
  }
}
</script>

<style scoped>
p{
  text-align: justify;
  text-justify: inter-word;
}
</style>
