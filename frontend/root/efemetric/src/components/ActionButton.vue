<template>
  <div class="elem" >
    <div class="elemValue">

      <p style="font-size:1.1vw;">
        {{mess1}}<br/>
        {{mess2}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    id: String,
    mess1: String,
    mess2: String
  },
}
</script>

<style scoped>

</style>
