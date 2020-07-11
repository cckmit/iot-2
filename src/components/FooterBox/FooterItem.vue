<template>
  <div class="footer-item" :style="style">
    <div class="footer-item--header">
      <span class="footer-item--title">{{title}}</span>
    </div>
    <div class="footer-item--body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterItem",

  props: {
    title: String,
    width: {}
  },

  computed: {
    style() {
      return {
        width: this.width
      };
    }
  }
};
</script>

<style>
</style>