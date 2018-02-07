import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    model: null,
    selected: null
  },
  mutations: {
    setModel(state, model) {
      state.model = model;
    },
    setSelected(store, selected) {
      store.selected = selected;
    }
  }
});
