import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";
import router from "./routes/index";
import firebase from "firebase";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VueGoogleMaps from "vue2-google-maps"; // Import package

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBDYESWfS7b2A9TeyD9SSLqaPfkzLEqz1g",
  authDomain: "web-challenge-9d8c4.firebaseapp.com",
  databaseURL:
    "https://web-challenge-9d8c4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "web-challenge-9d8c4",
  storageBucket: "web-challenge-9d8c4.appspot.com",
  messagingSenderId: "447845990637",
  appId: "1:447845990637:web:30568c5b46f96c5c588ce4",
};

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBeO_BS6ndB4ZVBU4sVYsKOzXR969FTH48",
    libraries: "places",
  },
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
