import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  data: {
    g_bossFight: {
      id:0,
      name:""
    }
  },
  render: h => h(App)
}).$mount('#app')

