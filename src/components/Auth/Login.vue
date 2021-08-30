<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row pt-2">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row pt-2">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0 pt-2">
                <div class="col-md-8 offset-md-4">
                  <b-button-group>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <router-link to="resetPassword" class="btn btn-primary"
                      >Reset Password</router-link
                    >
                  </b-button-group>
                </div>
              </div>
            </form>
            <div class="form-group row mb-0 pt-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },

  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.form.email)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.log(error);
          // ..
        });
    },
  },
};
</script>
