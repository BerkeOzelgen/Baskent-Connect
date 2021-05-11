import { createApp } from 'vue';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';

const optionsVueIO = {
  debug: true,
  connection: SocketIO('http://localhost:3000', {
    autoConnect: false,
  }),
};

const app = createApp(App)
  .use(store)
  .use(router)
  .use(new VueSocketIO(optionsVueIO));

app.mount('#app');
