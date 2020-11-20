<template>
  <v-app>
    <v-app-bar
      app
      class="grey darken-4"
      dark
    >
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <div class="d-flex justify-center font-weight-bold">
        EXAMPLE PAGE CREATED BY GROUP OF STUDENTS FOR INNOVATIVE PROJECT IN NOKIA
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <MetricsButtons/>
    </v-main>
  </v-app>
</template>

<script>
import MetricsButtons from './components/MetricsButtons';

export default {
  name: 'App',

  components: {
    MetricsButtons,
  },

  data: () => ({
    //
  }),
};
</script>
