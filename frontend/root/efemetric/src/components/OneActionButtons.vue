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
      <ActionButton :mess1="button11" :mess2="button12" :id=id :click-f=clickF>
      </ActionButton>
    </div>
  </div>
</template>

<script>
import ActionButton from "./ActionButton";

export default {
  name: "OneActionButtons",
  components: {
    ActionButton
  },
  props: {
    title:String,
    message:String,
    about:String,
    id:String,
    clickF: Function,
    button11: String,
    button12:String
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
