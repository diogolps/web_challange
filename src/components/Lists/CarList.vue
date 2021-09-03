<template>
  <div>
    <div class="card pt-5">
      <h3 class="card-header">
        Cars
      </h3>
      <b-container>
        <b-row class="b-row pt-2">
          <b-col
            cols="4"
            class="b-col "
            v-for="car in cars"
            :key="car.id + 'list'"
          >
            <p><b>Brand:</b> {{ car.brand }}</p>
            <p><b>Model:</b> {{ car.model }}</p>
            <p><b>Plate Number:</b> {{ car.plateNumber }}</p>
            <p>
              <b-button-group
                ><button class="btn btn-primary" @click="deleteCar(car.id)">
                  Delete Car
                </button>

                <router-link
                  :to="{ name: 'update', params: { id: car.id } }"
                  class="btn btn-primary"
                  >Edit Car</router-link
                >
              </b-button-group>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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
      activeItem: "",
      show: false,
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

    deleteCar(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .doc(docId)
        .delete();
    },

    update(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .doc(docId);
      this.car = docId;
    },

    updateCar(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .doc(docId)
        .update()
        .then(() => {
          this.successfully = true;
          this.car = {
            brand: "",
            model: "",
            plateNumber: "",
          };
        });
    },
  },

  created() {
    this.getCars();
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getCars().then((data) => (this.cars = data));
      }
    });
  },
};
</script>
