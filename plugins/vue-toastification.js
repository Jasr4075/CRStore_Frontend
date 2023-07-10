import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'vuetify/dist/vuetify.min.css';


Vue.use(Toast, {
  transition: "my-custom-fade",
  maxToasts: 10,
  newestOnTop: true,
  position: "top-center"
});