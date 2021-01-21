<template>
  <div class="row">
    <h2>{{ about }}</h2>
    <div class="column">
      <div style="line-height:1050%;">
        <br>
      </div>
      <p>{{title}}<br>
        {{message}}
      </p>
    </div>
    <div class="column">
      <div style="line-height:750%;">
        <br>
      </div>
      <ActionButton mess1=4r3 mess2="CZXCZXCz">
      </ActionButton>
      <ActionButton mess1="CXZCXZCXZ" mess2="CZXCZXCz">
      </ActionButton>
    </div>
  </div>
</template>

<script>
import ActionButton from "./ActionButton";

export default {
  name: "TwoActionButtons",
  components: {
    ActionButton
  },
  props: {
    button11:String,
    button12:String,
    button21:String,
    button22:String,
    title:String,
    message:String,
    about:String,
  },
}
</script>

<style scoped>

</style>
