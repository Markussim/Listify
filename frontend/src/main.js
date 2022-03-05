import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-3-socket.io";
import io from "socket.io-client";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBSk6Goi--7CeGNJ5Vx-Vcv_Ncn7PMU7p0",
  authDomain: "listify-df84d.firebaseapp.com",
  projectId: "listify-df84d",
  storageBucket: "listify-df84d.appspot.com",
  messagingSenderId: "137405468391",
  appId: "1:137405468391:web:3dd23342d930416e7c9c42",
};

const firebase = initializeApp(firebaseConfig);

const socketio = new VueSocketIO({
  debug: false,
  connection: io("http://localhost:3000"),
});

const app = createApp(App);

app.use(router);

app.use(socketio);

app.mount("#app");
