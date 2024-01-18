// import { importSpecifier } from '@babel/types'
import { createApp } from 'vue';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from './App.vue';
import router from './routes';
import store from './store' ;

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount('#app');

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/fm-typography.css';
import '@/assets/css/fm-config.css';


