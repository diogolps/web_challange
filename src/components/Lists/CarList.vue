<template>
  <div class="col-md-8">
    <div class="card">
      <div class="card-header">
        Cars
      </div>

      <div class="card">
        <div class="collection-item" v-for="car in cars" :key="car.id">
          <p><b>Brand:</b> {{ car.brand }}</p>
          <p><b>Model:</b> {{ car.model }}</p>
          <p><b>Plate Number:</b> {{ car.plateNumber }}</p>
          <p>
            <button class="btn btn-primary" @click="deleteCar(car.id)">
              Delete Car
            </button>

            <b-button
              @click="update(car.id)"
              v-b-modal.modal-center
              variant="primary"
              class="mr-2"
            >
              Edit Car
            </b-button>
            <b-modal v-model="show" id="modal-center" title="Centered modal">
              <form action="#">
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
                      v-model="car.brand"
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
                      required
                      v-model="car.plateNumber"
                    />
                  </div>
                </div>
              </form>
              <template v-slot:modal-footer="{ updateCar, cancel }">
                <b-button @click="updateCar()" variant="primary" class="mr-2">
                  Update
                </b-button>
                <b-button @click="cancel()" variant="primary" class="mr-2">
                  Cancel
                </b-button>
              </template>
            </b-modal>
          </p>
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
      activeItem: "",
      show: false,
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

    update(car) {
      this.car = car.data();
    },

    updateCar(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("cars")
        .doc(docId)
        .update();
    },
  },

  created() {
    this.getCars();
  },
};
</script>
