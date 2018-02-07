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
require('imports-loader?THREE=three!three/examples/js/loaders/VRMLLoader');

import model1 from 'file-loader!../assets/32184-4211621.wrl';
import model2 from 'file-loader!../assets/CAD-LA000053.wrl';
import model3 from 'file-loader!../assets/CAD-LA000042.wrl';
import modelHouse from 'file-loader!../assets/house.wrl';
import model24 from 'file-loader!../assets/24.wrl';
import modelPly from 'file-loader!../assets/greifer.ply';
import greiferWrl from 'file-loader!../assets/greifer.ply';
import traegerFBX from 'file-loader!../assets/traeger1.FBX';
import greiferFBX from 'file-loader!../assets/lessgreiferparts.FBX';

var renderer, scene, camera;

export default {
  name: 'Visualisation',
  props: {},
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

    var gridHelper = new THREE.GridHelper(28, 28, 0x303030, 0x303030);
    gridHelper.position.set(0, 0, 0);
    scene.add(gridHelper);

    var loader = new THREE.FBXLoader();
    loader.load(
      greiferFBX,
      object => {
        this.$emit('onModelLoaded', object);
        scene.add(object);
      },
      x => console.log(`${Math.round(x.loaded / x.total * 100)}% downloaded`),
      e => console.error(e)
    );

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
