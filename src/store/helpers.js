import { Mesh } from 'three';

export function getObjectTree(store, model) {
  if (!model) return null;
  const object = {
    id: model.uuid,
    name: model.name,
    cleanName: model.name.split('_')[0],
    type: model.type,
    _visible: model.visible,
    get isSelected() {
      return store.state.selectedObject == this;
    },
    children: model.children.map(child => getObjectTree(store, child))
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
  if (model instanceof Mesh) {
    model.userData.originalMaterial = model.material;
  }
  model.userData.storeObject = object;
  return object;
}

export function getMeshes(object) {
  if (!object) return [];
  const meshes = [];
  object.threeObject.traverse(o => {
    if (o instanceof Mesh) {
      meshes.push(o);
    }
  });
  return meshes;
}
