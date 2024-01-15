import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router/router';
import './assets/css/main.css';  
import store from './store/modules/userStore'; 

// Install Bootstrap
Vue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
router,
store, // 수정: userStore -> store
render: h => h(App),
}).$mount('#app')