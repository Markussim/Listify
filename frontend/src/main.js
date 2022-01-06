import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'

const socketio = new VueSocketIO({
    debug: false,
    connection: io('http://192.168.10.118:3000'),
  });

createApp(App).use(router).use(socketio).mount('#app')
