import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Auth/Login";
import Home from "../components/Home";
import Register from "../components/Auth/Register";
import Dashboard from "../components/Auth/Dashboard";
import Update from "../components/Auth/Update";
import ResetPassword from "../components/Auth/ForgotPassword";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/update",
      name: "update",
      component: Update,
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: ResetPassword,
    },
  ],
});

export default router;
