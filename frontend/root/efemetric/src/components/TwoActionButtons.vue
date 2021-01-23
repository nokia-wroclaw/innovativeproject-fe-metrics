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
      <img src="../assets/nokia2.png" width="90%" @click="clickF1" :id="id">
    </div>
  </div>
</template>

<script>
export default {

  name: "TwoActionButtons",

  props: {
    title:String,
    message:String,
    about:String,
    id:String,
    clickF1: Function,
    clickF2: Function
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
  padding-top: 3%;
  padding-left: 2%;
}
.frame{
  padding-top: 10px;
}
</style>
