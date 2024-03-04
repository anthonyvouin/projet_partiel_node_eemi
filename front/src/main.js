import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import { TinyEmitter } from "tiny-emitter";
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
export const bus = new TinyEmitter();

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.directive('tooltip', Tooltip);
app.use(ToastService);
app.mount('#app')
