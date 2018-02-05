<template lang="pug">
div.visualisation(ref="three")
</template>

<script>
/*eslint no-unused-vars: "off"*/
import * as THREE from 'three';

export default {
  name: 'Visualisation',
  props: {
    // msg: String
  },
  mounted() {
    const ref = this.$refs.three;
    console.log({ ref });
    const { clientHeight: height, clientWidth: width } = ref;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    ref.appendChild(renderer.domElement);
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
