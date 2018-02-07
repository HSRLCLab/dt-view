<template lang="pug">
div(id="app")
  Visualisation(
    @onDetailSelected="onDetailSelected"
    @onModelLoaded="onModelLoaded"
  )
  Details(
    :details="details"
    :model="model"
  )
</template>

<script>
import 'normalize.css';
import Visualisation from './components/Visualisation';
import Details from './components/Details';

export default {
  name: 'app',
  components: {
    Visualisation,
    Details
  },
  methods: {
    onModelLoaded(model) {
      this.model = model;
    },
    onDetailSelected(event) {
      console.log('test>', event);
    }
  },
  watch: {
    model: {}
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
  overflow-y: hidden;
  height: 100%;
}
</style>


<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #111111;
  display: grid;
  grid-template-areas: 'visualisation details';
  grid-template-columns: 1fr 1fr;
  height: 100%;
}
</style>
