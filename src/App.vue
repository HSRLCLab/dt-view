<template>
  <div id="app">
    <Visualisation @click="click"/>
    <Details :details="details"/>
  </div>
</template>

<script>
import 'normalize.css';
import Visualisation from './components/Visualisation.vue';
import Details from './components/Details.vue';

export default {
  name: 'app',
  components: {
    Visualisation,
    Details
  }
};
</script>

<style lang="scss">
html {
  margin: 0;
  height: 100%;
}

body {
  margin: 0;
  overflow-y: scroll;
  height: 100%;
}
</style>


<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: grid;
  grid-template-areas: 'visualisation details';
  grid-template-columns: 1fr 1fr;
  height: 100%;
}
</style>
