<template>
  <b-navbar
    class="navbar navbar-expand-md navbar-light navbar-laravel"
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand">Web Challenge</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <li class="nav-item">
              <router-link to="dashboard" class="nav-link">{{
                user.data.displayName
              }}</router-link>
            </li>
            <li class="nav-item">
              <b-link class="nav-link" @click.prevent="signOut"
                >Sign out</b-link
              >
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </b-navbar>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home",
          });
        });
    },
  },
};
</script>
