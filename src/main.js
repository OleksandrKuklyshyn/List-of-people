import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import moment from 'vue-moment'
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';


Vue.use(VeeValidate, {
  events: 'change|blur|xxx'
});

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(moment);
Vue.use(Vuex);

new Vue({
  render: h => h(App),
  
}).$mount('#app')

