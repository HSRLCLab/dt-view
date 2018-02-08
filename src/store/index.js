import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    objectTree: null,
    selected: null
  },
  getters: {
    treeRootObjects: state => {
      if (!state.objectTree) return null;
      return state.objectTree.children;
    }
  },
  mutations: {
    setObjectTree(state, model) {
      state.objectTree = getObjectTree(model);
    },
    setSelected(store, selected) {
      store.selected = selected;
    },
    setVisibility(state, { object, visible }) {
      console.log(object, visible);
      if (!object) return;
      object.visible = visible;
    }
  }
});

function getObjectTree(model) {
  if (!model) return null;
  const object = {
    id: model.uuid,
    name: model.name,
    type: model.type,
    get isSelected() {
      return store.state.selected == this;
    },
    children: model.children.map(c => getObjectTree(c))
  };
  Object.defineProperty(object, 'threeObject', {
    value: model
  });
  Object.defineProperty(object, 'visible', {
    get() {
      return this.threeObject.visible;
    },
    set(visible) {
      this.threeObject.visible = visible;
    }
  });
  return object;
}

export default store;
