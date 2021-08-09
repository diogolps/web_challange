<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Reset Password</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="resetPassword">
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

              <div class="form-group row mb-0 pt-3">
                <div class="col-md-8 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="resetPassword"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
              <div class="form-group row mb-0 pt-3">
                <div
                  v-show="successfully"
                  class="alert alert-success "
                  role="alert"
                >
                  Email sent !!
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      successfully: false,
      form: {
        email: "",
      },
      error: null,
    };
  },

  methods: {
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.form.email)
        .then(() => {
          console.log("Email sent");
          this.successfully = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
