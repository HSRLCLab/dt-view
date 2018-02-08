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

import { mapMutations, mapState } from 'vuex';
import model from 'file-loader!../assets/greiferReduced.FBX';

let renderer, scene, camera, ref;
const treeToThree = new Map();

export default {
  name: 'Visualisation',
  created() {
    window.addEventListener('resize', this.windowResized, false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResized, false);
  },
  mounted() {
    ref = this.$refs.three;
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
        this.setObjectTree(model);
        scene.add(model);
        this.$store.watch(state => state.objectTree, (newValue, oldValue) => this.render(), {
          deep: true
        });
        this.render();
      },
      x => console.log(`${Math.round(x.loaded / x.total * 100)}% downloaded`),
      e => console.error(e)
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    ref.appendChild(renderer.domElement);

    window.scene = scene;
    window.camera = camera;
    window.renderer = renderer;
  },
  computed: {
    ...mapState(['objectTree'])
  },
  methods: {
    ...mapMutations(['setObjectTree']),
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      renderer.render(scene, camera);
    },
    windowResized() {
      const { clientHeight: height, clientWidth: width } = ref;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      this.render();
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
