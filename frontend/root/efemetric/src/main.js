import Vue from 'vue'
import App from './App.vue'
import * as DatabaseController from "efemetrics3";
window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false
Vue.config.errorHandler = (event) =>
  {DatabaseController.catchErrors(event);
  }
new Vue({
  render: h => h(App),
}).$mount('#app')
