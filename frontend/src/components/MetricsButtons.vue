<template>
  <v-container>
    <v-spacer></v-spacer>
    <div class="pa-3">
     <v-btn 
     block 
     v-on:click="prepareQuery('metric' ,4200,
{'tag1':'test', tag2:3000, 'tag3':4000})">
    value with tags
  </v-btn>
  </div>
  <div class="pa-3">
     <v-btn 
     block 
     v-on:click="prepareQuery('metric' ,4200,
{'tag1':'dupa', tag2:2000, 'tag3':1000})">
    value with tags
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block
   v-on:click="dropDatabase('http://localhost:8086')" >
  <!--  v-on:click="checkDb('metrics')"> --->
    DROP
  </v-btn>
  </div>
  <div class="pa-3">
  <v-btn 
  block
  v-on:click="throwBasicError('FIRST ERROR')">
  THROW ERR
  </v-btn>
  </div>
  <div class="pa-3">
  <v-btn 
  block
  v-on:click="prepareQuery('NewMetric' ,5000)">
    do nothing
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block 
   v-on:click="prepareQuery('newMetric' ,3000)">
    send 50 - measurement name: NewMetric
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn
   block 
   v-on:click="checkHowLong(function(){longCount()},'longStart','longEnd')">
    longcount
  </v-btn>
  </div>
  <div class="pa-3">
   <v-btn 
   block 
   v-on:click="checkHowLong(function(){shortCount()},'shortStart','shortEnd')">
    shortcount
  </v-btn>
  </div>
  <!-- <div class="pa-3">
   <v-btn 
   block 
   v-on:click="sendInInterval(2, 'newMetric' ,20)">
    start sending 20 - measurement name: newMetric
  </v-btn>
  </div> -->
  </v-container>
</template>

<script>
import { checkHowLong, 
          throwBasicError, 
          dropDatabase, 
          prepareQuery, 
          init, 
          shortCount, 
          catchingErrors, 
          getPerformance, 
          catchingEventsLogs,
          longCount } from "../lib/sender.js";


  export default {
    name: 'HelloWorld',

    mounted: function () {
      init('http://localhost:8086/write?db=metrics','metrics');
      catchingEventsLogs();
      catchingErrors();
      getPerformance()
    },

    data: () => ({

    }),
    methods: {
      checkHowLong,
      throwBasicError,
      dropDatabase,
      prepareQuery,
      init,
      shortCount,
      getPerformance,
      catchingEventsLogs,
      catchingErrors,
      longCount,
    }

  }
</script>

