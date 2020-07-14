<template>
  <div class="percentbar" :class="vertical?'vertical':'horizontal'">
    <div class="percentbar__inner" :style="innerStyle"></div>
    <span class="percentbar__text">{{value | valueDisplay}}</span>
  </div>
</template>

<script>
export default {
  name: "Percentbar",

  filters: {
    valueDisplay(val) {
      return (val * 100).toFixed(2) + "%";
    }
  },

  computed: {
    innerStyle() {
      return {
        width: (this.value / this.maxValue) * 100 + "%"
      };
    }
  },

  props: {
    vertical: Boolean,
    width: String,
    value: Number,
    maxValue: {
      type: Number,
      default: 1
    },
    color: String
  }
};
</script>