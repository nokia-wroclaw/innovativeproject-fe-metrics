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
      <div class="frame">
        <iframe src="https://efemetric.site/grafana/d-solo/zDQGM52Gk/metric-basic-dashboard?orgId=1&panelId=22"
                height="300px" width="100%" style="float: left; margin-right: 10px "
                align="left"></iframe>
      </div>
    </div>
      <div class="rightColumn">
      <ActionButton :mess1="button11" :mess2="button12" :id="id1" :click-f=clickF1>
      </ActionButton>
      <ActionButton :mess1="button21" :mess2="button22" :id="id2" :click-f=clickF2>
      </ActionButton>
      <ActionButton :mess1="button31" :mess2="button32" :id="id3" :click-f=clickF3>
      </ActionButton>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
export default {
  name: "ThreeActionButtons",
  components: {
    ActionButton
  },
  props: {
    button11:String,
    button12:String,
    button21:String,
    button22:String,
    button31:String,
    button32:String,
    title:String,
    message:String,
    about:String,
    id1:String,
    id2:String,
    id3:String,
    clickF1: Function,
    clickF2: Function,
    clickF3: Function
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
