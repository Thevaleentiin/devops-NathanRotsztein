import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import trad from "./components/mixins/trad";
import db from "./assets/data/db.json";

Vue.mixin(trad);

Vue.config.productionTip = false;

Vue.prototype.$db = db;

Vue.use(Vuex);

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
