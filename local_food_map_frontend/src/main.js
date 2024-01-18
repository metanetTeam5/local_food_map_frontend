import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import './assets/css/main.css';  
import store from './store/modules/userStore'; 

import BootstrapVue from 'bootstrap-vue';

// Bootstrap CSS 파일 (및 선택적으로 BootstrapVue CSS)을 가져옵니다.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// BootstrapVue 플러그인을 Vue에 설치합니다.
Vue.use(BootstrapVue)



Vue.config.productionTip = false

new Vue({
router,
store, // 수정: userStore -> store
render: h => h(App),
}).$mount('#app')