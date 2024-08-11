// import '@/assets/main.css';
import '@/index.css';

import { createApp } from 'vue';
import pinia from '@/pinia/pinia.js';
// import { createPinia } from 'pinia';
import httpRequest from '@/axios/axios.js';
import GlobalLoading from '@/components/GlobalLoading.vue';

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);

// app.use(createPinia());
app.use(pinia);
app.use(router);

app.component('GlobalLoading', GlobalLoading);

app.config.globalProperties.$httpRequest = httpRequest;
app.mount('#app');
