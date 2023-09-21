import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from './store';

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components: {
        ...components,
        ...labsComponents,
        ...directives,
    }
});

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);

app.mount("#app");