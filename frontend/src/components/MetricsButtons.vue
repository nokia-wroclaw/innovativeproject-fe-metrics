<template>
  <v-container>
    <v-spacer></v-spacer>
    <div class="pa-3">
     <v-btn 
     block 
     v-on:click="basicSend('metric' ,42, {'tag1':20, tag2:30, 'tag3':40})">
    send 42 - measurement name: fem_metric
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block >
  <!--  v-on:click="checkDb('metrics')"> --->
    TEST
  </v-btn>
  </div>
  <div class="pa-3">
  <v-btn 
  block>
    do nothing
  </v-btn>
  </div>
  <div class="pa-3">
  <v-btn 
  block>
    do nothing
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block 
   v-on:click="basicSend('NewMetric' ,50)">
    send 50 - measurement name: NewMetric
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn
   block 
   v-on:click="createDb('test')">
    create DB
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block 
   v-on:click="basicSend('newMetric' ,30)">
    send 30 - measurement name: newMetric
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block 
   v-on:click="sendInInterval(2, 'newMetric' ,20)">
    start sending 20 - measurement name: newMetric
  </v-btn>
  </div>
  </v-container>
</template>

<script>
import { sendInInterval, basicSend, init, create, checkDb } from "../lib/sender.js";


  export default {
    name: 'HelloWorld',

    mounted: function () {
      init('http://localhost:8086/write?db=metrics','metrics');
    },

    data: () => ({

    }),

  }
</script>

