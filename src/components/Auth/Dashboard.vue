<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <h3 class="card-header">Dashboard</h3>
          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">
              You are logged in!
            </div>
            <h3 class="card-header">
              Add a Car
            </h3>
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
                      placeholder="41.227064"
                      pattern="-?\d{1,3}\.\d+"
                      v-model="car.lat"
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
                      placeholder="-8.618287"
                      pattern="-?\d{1,3}\.\d+"
                      v-model="car.lng"
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
                  <div class="pt-3">
                    <div
                      v-show="successfully"
                      class="alert alert-success"
                      role="alert"
                    >
                      Car added successfully!!
                    </div>
                  </div>
                </div>
              </form>
              <car-list />
              <div class="card pt-5">
                <h3 class="card-header">Map Location</h3>

                <GmapMap
                  :center="{ lat: 41.1669838, lng: -8.5881368 }"
                  :zoom="10"
                  :opened="infoOpened"
                  :options="{
                    streetViewControl: false,
                  }"
                  @closeclick="infoOpened = false"
                  map-type-id="roadmap"
                  style="width: 800px; height: 400px; margin-top:60px"
                >
                  <Gmap-info-window
                    :options="infoOptions"
                    :position="infoPosition"
                    :opened="infoOpened"
                    @closeclick="infoOpened = false"
                  >
                    {{ infoContent }}
                  </Gmap-info-window>
                  <GmapMarker
                    v-for="car in coordinates"
                    :key="car.id + 'map'"
                    :position="getPosition(car)"
                    :clickable="true"
                    @click="toggleInfo(car)"
                  />
                </GmapMap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import CarList from "../Lists/CarList.vue";

export default {
  name: "GoogleMap",
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
      coordinates: [],
      car: {
        brand: "",
        model: "",
        plateNumber: "",
        lat: "",
        lng: "",
      },
      error: null,
      streetView: false,
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },

  methods: {
    async getCoordinates() {
      var carsRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars");

      carsRef.onSnapshot((snap) => {
        this.coordinates = [];
        snap.forEach((doc) => {
          var carCoordinates = doc.data();
          carCoordinates.id = doc.id;
          this.coordinates.push(carCoordinates);
        });
      });
    },

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
          lat: this.car.lat,
          lng: this.car.lng,
        })
        .then(() => {
          this.successfully = true;
          this.car = {
            brand: "",
            model: "",
            plateNumber: "",
            lat: "",
            lng: "",
          };
        });
    },

    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
      };
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.brand;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
  },

  created() {
    this.getCoordinates();
  },
};
</script>
