import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'

const socketio = new VueSocketIO({
    debug: true,
    connection: io('http://localhost:3000/api/'),
    options: { path: "/api/" }
  });

createApp(App).use(router).use(socketio).mount('#app')
