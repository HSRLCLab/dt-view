import Vue from 'vue';
import Vuex from 'vuex';
import { selectedMaterial } from '../three/helpers';
import { getObjectTree, getMeshes } from './helpers';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    objectTree: null,
    selectedObject: null
  },
  getters: {
    treeRootObjects: state => {
      if (!state.objectTree) return null;
      return state.objectTree.children;
    }
  },
  mutations: {
    setObjectTree(state, model) {
      state.objectTree = getObjectTree(store, model);
    },
    objectSelected(state, object) {
      getMeshes(state.selectedObject).forEach(mesh => {
        mesh.material = mesh.userData.originalMaterial;
      });
      state.selectedObject = object;
      getMeshes(state.selectedObject).forEach(mesh => {
        mesh.material = selectedMaterial;
      });
    },
    nothingSelected(state) {
      getMeshes(state.selectedObject).forEach(mesh => {
        mesh.material = mesh.userData.originalMaterial;
      });
      state.selectedObject = null;
    },
    setVisibility(state, { object, visible }) {
      if (!object) return;
      object.visible = visible;
    }
  }
});

export default store;
