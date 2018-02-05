<template lang="pug">
div.details
	ul
		li(v-for="detail in details") {{detail.text}}
</template>

<script>
export default {
  name: "Details",
  props: {
    details: Array
  }
};
</script>

<style lang="scss" scoped>
.details {
  grid-area: details;
}
</style>
