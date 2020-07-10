<template>
  <div class="layer">
      <slot />
  </div>
</template>

<script>
export default {
  name: "Layer",

  props: {
    index: Number
  },

  computed: {
    style() {
      const { index } = this;
      return {
        zIndex: index
      };
    }
  }
};
</script>