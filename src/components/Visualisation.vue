<template lang="pug">
div.visualisation(
  ref="three"
  @click="detailSelected"
)
</template>

<script>
/*eslint no-unused-vars: "off", no-undef: "off"*/
import * as THREE from 'three';

window.THREE = THREE;
require('three/examples/js/controls/OrbitControls');

export default {
  name: 'Visualisation',
  mounted() {
    const ref = this.$refs.three;
    console.log({ ref });
    const { clientHeight: height, clientWidth: width } = ref;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    scene.add(camera);
    const controls = new THREE.OrbitControls(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    ref.appendChild(renderer.domElement);
  },
  methods: {
    detailSelected(event) {
      this.$emit('detailSelected', event);
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
