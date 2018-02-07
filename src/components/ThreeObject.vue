<template lang="pug">
div.threeObject(
	v-if="object && object.type != 'Mesh'"
)
	label
		input(
			type="checkbox"
			v-model="object.visible"
		)
		| {{object.name}}
	ThreeObject(
		v-for="child in object.children"
		:key="child.uuid"
		:object="child"
	)
</template>

<script>
export default {
  name: 'ThreeObject',
  props: {
    object: Object
  }
};
</script>

<style lang="scss" scoped>
.threeObject {
  margin-left: 20px;
  margin-top: 5px;
  label {
    background: #cccccc;
    padding: 2px 4px 2px 2px;
    display: inline-block;
    line-height: 20px;
    input {
      height: 20px;
      width: 20px;
      float: left;
      margin-right: 5px;
    }
  }
}
</style>
