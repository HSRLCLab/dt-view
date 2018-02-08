<template lang="pug">
div.details
  h1 DigitalTwin
  hr
  section(v-if="selectedObject")
    h2 Selected element: 
      span {{selectedObject.cleanName}}
  //- Selected (insert stuff :D)
  //- ul
  //-   li(v-for="detail in details") {{detail.text}}
  section(v-if="treeRootObjects")
    h2 CAD-Tree
    ThreeObject(
      v-if="treeRootObjects"
      v-for="object in treeRootObjects"
      :key="object.id"
      :object="object"
    )
</template>

<script>
import ThreeObject from './ThreeObject';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Details',
  components: {
    ThreeObject
  },
  computed: {
    ...mapState(['selectedObject']),
    ...mapGetters(['treeRootObjects'])
  }
};
</script>

<style lang="scss" scoped>
.details {
  grid-area: details;
  overflow-y: scroll;
  padding: 0 20px 20px;
}
</style>
