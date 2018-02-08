import Vue from 'vue';
import Vuex from 'vuex';

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
      state.objectTree = getObjectTree(model);
    },
    objectSelected(store, object) {
      store.selectedObject = object;
    },
    nothingSelected(store) {
      store.selectedObject = null;
    },
    setVisibility(state, { object, visible }) {
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
    _visible: model.visible,
    get isSelected() {
      return store.state.selectedObject == this;
    },
    children: model.children.map(c => getObjectTree(c))
  };
  Object.defineProperty(object, 'threeObject', {
    value: model
  });
  Object.defineProperty(object, 'visible', {
    get() {
      return this._visible;
    },
    set(visible) {
      this.threeObject.visible = visible;
      // update prop so vue knows that model changed
      this._visible = visible;
    }
  });
  object.threeObject.userData.storeObject = object;
  return object;
}

export default store;
