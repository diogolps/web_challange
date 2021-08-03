<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Cars
          </div>
          <div class="collection-item" v-for="car in cars" :key="car.id">
            Brand: {{ car.brand }} Model: {{ car.model }} Plate Number:
            {{ car.plateNumber }}
          </div>
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
      cars: [],
      car: {
        brand: "",
        model: "",
        plateNumber: "",
      },
    };
  },
  methods: {
    async getCars() {
      var carsRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars");

      carsRef.onSnapshot((snap) => {
        this.cars = [];
        snap.forEach((doc) => {
          var car = doc.data();
          car.id = doc.id;
          this.cars.push(car);
        });
      });
    },
  },

  created() {
    this.getCars();
  },
};
</script>
