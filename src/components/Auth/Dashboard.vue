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
                <div class="form-group pt-3 row">
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
                      placeholder="Brand"
                      value
                      required
                      autofocus
                      v-model="car.brand"
                    />
                  </div>
                </div>

                <div class="form-group pt-3 row">
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
                      placeholder="Model"
                      value
                      required
                      autofocus
                      v-model="car.model"
                    />
                  </div>
                </div>

                <div class="form-group pt-3  row">
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
                <div class="form-group pt-3  row">
                  <label
                    for="plate-number"
                    class="col-md-4 col-form-label text-md-right"
                    >Latitude</label
                  >

                  <div class="col-md-6">
                    <input
                      id="latitude"
                      type="name"
                      class="form-control"
                      name="latitude"
                      placeholder="Latitude"
                      v-model="car.coordinates.latitude"
                      required
                    />
                  </div>
                </div>
                <div class="form-group pt-3  row">
                  <label
                    for="plate-number"
                    class="col-md-4 col-form-label text-md-right"
                    >Longitude</label
                  >

                  <div class="col-md-6">
                    <input
                      id="longitude"
                      type="name"
                      class="form-control"
                      name="longitude"
                      placeholder="Longitude"
                      v-model="car.coordinates.longitude"
                      required
                    />
                  </div>
                </div>

                <div class="form-group pt-3  row mb-0">
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
              <GmapMap
                :center="{ lat: 41.1669838, lng: -8.5881368 }"
                :zoom="12"
                map-type-id="roadmap"
                style="width: 800px; height: 400px; margin-top:60px"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center = m.position"
                />
              </GmapMap>
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
      car: {
        brand: "",
        model: "",
        plateNumber: "",
        coordinates: {
          latitude: "",
          longitude: "",
        },
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
          brand: this.car.brand,
          model: this.car.model,
          plateNumber: this.car.plateNumber,
          latitude: this.car.coordinates.latitude,
          longitude: this.car.coordinates.longitude,
        })
        .then(() => {
          this.successfully = true;
          this.car = {
            brand: "",
            model: "",
            plateNumber: "",
            coordinates: {
              latitude: "",
              longitude: "",
            },
          };
        });
    },
  },
};
</script>
