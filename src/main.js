import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// vue bootstrap
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// VeeValidate
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// fontawesome
import "./assets/fontawesome/css/fontawesome.min.css";

// main sass file
import "./sass/main.scss";

// custom directive
Vue.directive('backBtn', {
  bind: function (el) {
    el.addEventListener("click", () => {
      router.go(-1);
    })
  }
});

// global mixin
Vue.mixin({
  methods: {
    displayToast(msg, title, type) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: type,
        solid: true
      });
    },
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
