<template>
  <div class="radio-switch" :style="style">
    <div class="radio-switch--group">
      <i class="radio-switch--handle" :style="handlerStyle"></i>
      <div
        @click="vValue=i.value"
        class="radio-switch--item"
        :class="{active:vValue===i.value}"
        v-for="i in options"
        :key="i.value"
      >{{i.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioSwitch",
  props: {
    value: {},
    options: Array
  },
  data() {
    return {
      vValue: this.value
    };
  },
  computed: {
    style() {
      return {};
    },
    currentIndex() {
      return this.options.findIndex(i => i.value === this.vValue);
    },
    optionsCount() {
      return this.options.length;
    },
    handlerStyle() {
      if (this.currentIndex < 0) return { display: "none" };
      return {
        left: (this.currentIndex / this.optionsCount) * 100 + "%"
      };
    }
  },
  watch: {
    value(val) {
      this.vValue = val;
    },
    vValue(val) {
      this.$emit("change", val);
    }
  }
};
</script>

<style>
</style>