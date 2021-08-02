import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import firebase from "firebase";
import store from "./store";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBDYESWfS7b2A9TeyD9SSLqaPfkzLEqz1g",
  authDomain: "web-challenge-9d8c4.firebaseapp.com",
  projectId: "web-challenge-9d8c4",
  storageBucket: "web-challenge-9d8c4.appspot.com",
  messagingSenderId: "447845990637",
  appId: "1:447845990637:web:30568c5b46f96c5c588ce4",
};

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
