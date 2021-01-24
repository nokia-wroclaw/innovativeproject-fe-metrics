<template>
  <div class="row">
    <div class="heading">
      <h2>{{ about }}</h2>
    </div>
    <div class="leftColumn">
      <h4>{{title}}</h4>
      <p>
        {{message}}
      </p>
    </div>
    <div class="rightColumn">
      <iframe src="https://efemetric.site/grafana/d-solo/zDQGM52Gk/metric-basic-dashboard?orgId=1&panelId=26"
              height="300px" width="100%" style="float: left; margin-right: 10px "
              align="left"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoActionButtons",
  props: {
    title:String,
    message:String,
    about:String,
  }
}
</script>

<style scoped>
.row p{
  text-align: justify;
  text-justify: inter-word;
}
.heading{
  margin-bottom: 90px;
}
.leftColumn {
  float: left;
  width: 38%;
  padding-left: 15%;
}
.rightColumn {
  float: left;
  width: 38%;
  padding-left: 2%;
}
.frame{
  padding-top: 10px;
}
</style>
