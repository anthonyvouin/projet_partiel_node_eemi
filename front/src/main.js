import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import { TinyEmitter } from "tiny-emitter";
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';

// pour passer des évenements d'un composant à l'autre (hors enfants/parents)
export const bus = new TinyEmitter();

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.mount('#app')
