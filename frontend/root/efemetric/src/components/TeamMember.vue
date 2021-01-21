<template>
  <div class="row">
    <div class="columnTeam">
      <img :src="resolve_img_url(picture_src)" :alt="altImg"  style="width:35%;"><br>
    </div>
    <div class="columnTeam">
      <b>{{ name }}</b>
      <p>	{{msg}} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamMember",
  props: {
    msg: String,
    picture_src: String,
    name: String,
    altImg: String,
  },
  methods: {
    resolve_img_url: function (path) {
      let images = require.context('../assets/', false, /\.png$|\.jpeg$/)
      return images("./"+path)
    }
  }
}
</script>

<style scoped>
</style>
