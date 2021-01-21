<template>
  <div class="row">
    <h2>Short tutorial</h2>
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
      <ActionButton>
        {{button1}}
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
    button1:String,
    title:String,
    message:String
  },

}
</script>

<style scoped>

</style>
