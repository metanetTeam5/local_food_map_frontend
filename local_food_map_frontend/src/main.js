import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import './assets/css/main.css';  
import store from './store/modules/userStore'; 



Vue.config.productionTip = false

new Vue({
router,
store, // 수정: userStore -> store
render: h => h(App),
}).$mount('#app')