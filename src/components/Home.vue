<template>
  <div class="background p0">
    <div class="container">
      <div class="wrapper">
        <h1 id="title">Web Challange</h1>
      </div>
      <div class="wrapper2">
        <h2 id="title2">Add your cars and their location</h2>
      </div>
    </div>
  </div>
</template>

<script>
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

  methods: {},
};
</script>

<style scoped>
.background {
  background-image: url("../images/email-location-tracking-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  height: 750px;
}

h1 {
  text-align: center;
  color: white;
  padding-top: 9rem !important;
}

h2 {
  text-align: center;
  color: white;
  padding-top: 5rem !important;
}

.wrapper {
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 200px;
  margin: auto 38%;
}

#title {
  position: absolute;
  left: -280px;
  -webkit-animation: title 0.5s forwards;
  -webkit-animation-delay: 1s;
  animation: title 0.5s forwards;
  animation-delay: 1s;
}

@-webkit-keyframes title {
  100% {
    left: 0;
  }
}

@keyframes title {
  100% {
    left: 0;
  }
}

.wrapper2 {
  position: relative;
  overflow: hidden;
  width: 470px;
  height: 200px;
  margin: auto 30%;
}

#title2 {
  position: absolute;
  left: -500px;
  -webkit-animation: title 0.5s forwards;
  -webkit-animation-delay: 2s;
  animation: title 0.5s forwards;
  animation-delay: 2s;
}

@-webkit-keyframes title2 {
  100% {
    left: 0;
  }
}

@keyframes title2 {
  100% {
    left: 0;
  }
}
</style>
