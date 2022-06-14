import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/md-light-deeppurple/theme.css";

import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Card from "primevue/card";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Menubar from "primevue/menubar";
import Calendar from "primevue/calendar";
import Knob from "primevue/knob";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from "primevue/datatable";
import Column from "primevue/column"
import ContextMenu from "primevue/contextmenu";

const app = createApp(App);

// dependencies
app.use(createPinia());
app.use(router);
app.use(PrimeVue);

// constants
app.provide("apiUrl", "http://localhost:3001/api/");
// app.provide("apiUrl", "http://vps2290194.fastwebserver.de:9730/api/");

// PrimeVue components
app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("Card", Card);
app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("Menubar", Menubar);
app.component("Calendar", Calendar);
app.component("Knob", Knob);
app.component("InputNumber", InputNumber);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Column", Column);
app.component("DataTable", DataTable);
app.component("ContextMenu", ContextMenu);

app.mount("#app");
