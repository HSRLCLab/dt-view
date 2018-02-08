<template lang="pug">
div.threeObject
	div.singleObject(
		:class="object.isSelected && 'selected'"
		@click="selectObject"
	)
		input(
			type="checkbox"
			v-model="visible"
		)
		| {{object.name}}
	ThreeObject(
		v-for="child in childrenNotMesh"
		:key="child.id"
		:object="child"
	)
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ThreeObject',
  props: {
    object: Object
  },
  computed: {
    childrenNotMesh() {
      const object = this.object;
      return object.children.filter(c => c.type != 'Mesh');
    },
    visible: {
      get() {
        return this.object.visible;
      },
      set(value) {
        this.$store.commit('setVisibility', {
          object: this.object,
          visible: value
        });
      }
    }
  },
  methods: {
    ...mapMutations(['objectSelected']),
    selectObject() {
      console.log('selected', this);
      this.objectSelected(this.object);
    }
  }
};
</script>

<style lang="scss" scoped>
.threeObject {
  margin-left: 20px;
  margin-top: 5px;
  .singleObject {
    background: #cccccc;
    padding: 2px 4px 2px 2px;
    display: inline-block;
    line-height: 20px;
    margin-left: -20px;
    cursor: pointer;
    &.selected {
      background: #001f3f;
      color: white;
    }
    input {
      height: 20px;
      width: 20px;
      float: left;
      margin-right: 5px;
    }
  }
}
</style>
