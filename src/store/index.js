import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLang: "fr-FR",
  },
  mutations: {
    SET_LANG(state, newLang) {
      state.currentLang = newLang;
    },
  },
  actions: {
    setLang({ commit }, newLang) {
      commit("SET_LANG", newLang);
    },
  },
  getters: {
    getCurrentLang: (state) => state.currentLang,
  },
});
