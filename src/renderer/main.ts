import { createApp } from 'vue'
import vuetify from './vuetify';

import App from './App.vue'

const app = createApp(App);

app.use(vuetify);
// app.config.compilerOptions.isCustomElement = (tag) => {
//     return ['webview'].includes(tag)
// }
app.mount('#app');
