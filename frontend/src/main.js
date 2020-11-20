import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// import vue-jquery from 'vue-jquery'
// Vue.use(vue-jquery)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
