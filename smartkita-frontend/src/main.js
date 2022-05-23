import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/md-light-deeppurple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';



const app = createApp(App);

// dependencies
app.use(createPinia());
app.use(router);
app.use(PrimeVue);

// PrimeVue components
app.component('Button', Button);
app.component('Sidebar', Sidebar);
app.component('Card', Card);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);

app.mount("#app");
