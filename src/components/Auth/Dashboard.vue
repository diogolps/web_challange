<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">
              You are logged in!
            </div>
            <div class="card-header">
              Add a Car
            </div>
            <div>
              <form action="#" @submit.prevent="addCar">
                <div class="form-group row">
                  <label
                    for="brand"
                    class="col-md-4 col-form-label text-md-right"
                    >Brand</label
                  >

                  <div class="col-md-6">
                    <input
                      id="brand"
                      type="name"
                      class="form-control"
                      name="brand"
                      value
                      required
                      autofocus
                      v-model="form.brand"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="model"
                    class="col-md-4 col-form-label text-md-right"
                    >Model</label
                  >

                  <div class="col-md-6">
                    <input
                      id="model"
                      type="name"
                      class="form-control"
                      name="model"
                      value
                      required
                      autofocus
                      v-model="form.model"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="plate-number"
                    class="col-md-4 col-form-label text-md-right"
                    >Plate Number</label
                  >

                  <div class="col-md-6">
                    <input
                      id="plate-number"
                      type="name"
                      class="form-control"
                      name="plate-number"
                      required
                      v-model="form.plateNumber"
                    />
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                      Add Car
                    </button>
                  </div>
                  <div
                    v-show="successfully"
                    class="alert alert-success"
                    role="alert"
                  >
                    Car added successfully!!
                  </div>
                </div>
              </form>
              <car-list />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import firebase from "firebase";
import CarList from "../Lists/CarList.vue";

export default {
  components: { CarList },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },

  data() {
    return {
      successfully: false,
      form: {
        brand: "",
        model: "",
        plateNumber: "",
      },
      error: null,
    };
  },

  methods: {
    addCar() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .add({
          brand: this.form.brand,
          model: this.form.model,
          plateNumber: this.form.plateNumber,
        })
        .then(() => {
          this.successfully = true;
          this.form = {
            brand: "",
            model: "",
            plateNumber: "",
          };
        });
    },
  },
};
</script>
