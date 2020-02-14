import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingOverlay: false,
    addRecipeStatus: false,
    editRecipeStatus: false,
  },
  getters: {
    getLoadingStatus(state) {
      return state.loadingOverlay;
    },
    getAddRecipeStatus(state) {
      return state.addRecipeStatus;
    },
    getEditRecipeStatus(state) {
      return state.editRecipeStatus;
    }
  },
  mutations: {
    toggleLoading(state) {
      state.loadingOverlay = !state.loadingOverlay;
    },
    toggleAddRecipeStatus(state) {
      state.addRecipeStatus = !state.addRecipeStatus;
    },
    toggleEditRecipeStatus(state) {
      state.editRecipeStatus = !state.editRecipeStatus;
    },
  },
  actions: {
    toogleLoading({commit}) {
      commit("toggleLoading");
    },
    toggleAddRecipeStatus({commit}) {
      commit("toggleAddRecipeStatus");
    },
    toggleEditRecipeStatus({commit}) {
      commit("toggleEditRecipeStatus");
    }
  },
  modules: {}
});
