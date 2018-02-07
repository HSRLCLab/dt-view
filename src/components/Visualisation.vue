<template lang="pug">
div.visualisation(
  ref="three"
)
</template>

<script>
/*eslint no-unused-vars: "off", no-undef: "off"*/
require('imports-loader?this=>window!three/examples/js/libs/inflate.min.js');
import * as THREE from 'three';
window.THREE = THREE;
require('imports-loader?THREE=three!three/examples/js/controls/OrbitControls');
require('imports-loader?THREE=three!../three/FBXLoader');

import { mapGetters, mapMutations } from 'vuex';
import model from 'file-loader!../assets/greiferReduced.FBX';

let renderer, scene, camera;

export default {
  name: 'Visualisation',
  props: {},
  mounted() {
    const ref = this.$refs.three;
    const { clientHeight: height, clientWidth: width } = ref;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
    camera.position.z = 10;

    const controls = new THREE.OrbitControls(camera, ref);
    controls.addEventListener('change', this.render);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    scene.add(camera);

    // light
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(200, 200, 1000).normalize();
    camera.add(dirLight);
    camera.add(dirLight.target);
    // scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const gridHelper = new THREE.GridHelper(28, 28, 0x303030, 0x303030);
    gridHelper.position.set(0, 0, 0);
    scene.add(gridHelper);

    const loader = new THREE.FBXLoader();
    loader.load(
      model,
      model => {
        this.setModel(model);
        scene.add(model);
      },
      x => console.log(`${Math.round(x.loaded / x.total * 100)}% downloaded`),
      e => console.error(e)
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    ref.appendChild(renderer.domElement);

    // this.animate();

    window.scene = scene;
    window.camera = camera;
    window.renderer = renderer;
  },
  computed: {
    ...mapGetters({
      model: 'model'
    })
  },
  watch: {
    // render if model changed
    model(newModel, oldModel) {
      this.render();
    }
  },
  methods: {
    ...mapMutations(['setModel']),
    detailSelected(event) {
      this.$emit('detailSelected', event);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      renderer.render(scene, camera);
    }
  }
};
</script>

<style lang="scss" scoped>
.visualisation {
  grid-area: visualisation;
  overflow: hidden;
  /deep/ canvas {
    display: block;
  }
}
</style>
