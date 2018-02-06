<template lang="pug">
div.visualisation(
  ref="three"
)
</template>

<script>
/*eslint no-unused-vars: "off", no-undef: "off"*/
import * as THREE from 'three';
import model1 from 'file-loader!../assets/32184-4211621.wrl';
import model2 from 'file-loader!../assets/CAD-LA000053.wrl';
import model3 from 'file-loader!../assets/CAD-LA000042.wrl';
import modelHouse from 'file-loader!../assets/house.wrl';
import model24 from 'file-loader!../assets/24.wrl';
import modelPly from 'file-loader!../assets/greifer.ply';
import greiferWrl from 'file-loader!../assets/greifer.ply';

window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/VRMLLoader');
require('three/examples/js/loaders/FBXLoader');
var renderer, scene, camera;

export default {
  name: 'Visualisation',
  mounted() {
    const ref = this.$refs.three;
    const { clientHeight: height, clientWidth: width } = ref;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
    camera.position.z = 10;

    const controls = new THREE.OrbitControls(camera);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    scene.add(camera);

    // light
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(200, 200, 1000).normalize();
    camera.add(dirLight);
    camera.add(dirLight.target);
    // scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const loader = new THREE.VRMLLoader();
    loader.load(model1, function(object) {
      scene.add(object);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    ref.appendChild(renderer.domElement);

    this.animate();

    window.scene = scene;
    window.camera = camera;
    window.renderer = renderer;
  },
  methods: {
    detailSelected(event) {
      this.$emit('detailSelected', event);
    },
    animate() {
      requestAnimationFrame(this.animate);
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
