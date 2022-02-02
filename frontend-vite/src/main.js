import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-3-socket.io";
import io from "socket.io-client";

const socketio = new VueSocketIO({
  debug: false,
  connection: io("http://localhost:3000"),
});

const app = createApp(App);

app.use(router);

app.use(socketio);

app.mount("#app");
