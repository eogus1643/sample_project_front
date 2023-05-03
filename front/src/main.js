import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios';
import excel from "@/assets/js/excel.js";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import validation from '@/assets/js/validation.js'
import common from '@/assets/js/common.js'

//createApp(App).use(store).use(router).mount('#app')

const app = createApp(App);
axios.defaults.baseURL = "/backend"; //아파치에서 구동 시 기존 proxy값은 적용안됨. baseURL로 설정.

app.config.globalProperties.$axios = axios;

app.use(excel);
app.use(VueSweetalert2);
app.use(validation);
app.use(common);
app.use(router).mount('#app');