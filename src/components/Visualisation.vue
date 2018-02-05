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

window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/VRMLLoader');
var renderer, scene, camera;

export default {
  name: 'Visualisation',
  mounted() {
    const ref = this.$refs.three;
    console.log({ ref });
    const { clientHeight: height, clientWidth: width } = ref;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;
    window.camera = camera;

    const controls = new THREE.OrbitControls(camera);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.add(camera);

    // light
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(2000, 2000, 2000).normalize();
    camera.add(dirLight);
    camera.add(dirLight.target);

    const loader = new THREE.VRMLLoader();
    loader.load(model2, function(object) {
      scene.add(object);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    ref.appendChild(renderer.domElement);

    this.animate();
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
