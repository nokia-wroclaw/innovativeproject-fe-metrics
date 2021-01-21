<template>
  <div class="navibar">
    <a id="About"> </a>
    <h2 style="font-size:vw">About</h2>
    <p> {{ title }}</p>
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
</style>
