<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Cars
          </div>
          <form action="#" @submit.prevent="onSubmit">
            <div class="form-group row">
              <label for="brand" class="col-md-4 col-form-label text-md-right"
                >Brand</label
              >

              <div class="col-md-6">
                <input
                  id="brand"
                  type="name"
                  class="form-control"
                  name="brand"
                  placeholder="Brand"
                  value
                  required
                  autofocus
                  v-model="car.brand"
                />
              </div>
            </div>

            <div class="form-group row">
              <label for="model" class="col-md-4 col-form-label text-md-right"
                >Model</label
              >

              <div class="col-md-6">
                <input
                  id="model"
                  type="name"
                  class="form-control"
                  name="model"
                  placeholder="Model"
                  value
                  required
                  autofocus
                  v-model="car.model"
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
                  placeholder="00-AA-00"
                  pattern="(^(?:[A-Z]{2}-\d{2}-\d{2})|(?:\d{2}-[A-Z]{2}-\d{2})|(?:\d{2}-\d{2}-[A-Z]{2})$)"
                  required
                  v-model="car.plateNumber"
                />
              </div>
            </div>

            <div class="form-group row mb-0">
              <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary">
                  Update Car
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },

  data() {
    return {
      car: {},
    };
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .doc(this.$route.params.id)
        .update(this.car)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          alert(err);
        });
    },
  },

  created() {
    let carId = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("cars")
      .doc(this.$route.params.id);
    carId
      .get()
      .then((res) => {
        this.car = res.data();
      })
      .catch((err) => {
        alert(err);
      });
  },
};
</script>
