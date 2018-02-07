<template lang="pug">
div.details
  ul
    li(v-for="detail in details") {{detail.text}}
  div
    ThreeObject(
      v-if="model"
      :object="model"
    )
</template>

<script>
import ThreeObject from './ThreeObject';

export default {
  name: 'Details',
  props: {
    details: Array,
    model: Object
  },
  components: {
    ThreeObject
  }
};
</script>

<style lang="scss" scoped>
.details {
  grid-area: details;
  overflow-y: scroll;
}
</style>
