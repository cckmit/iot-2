<template>
  <div class="percentbar" :class="vertical?'vertical':'horizontal'">
    <div class="percentbar__inner" :style="innerStyle"></div>
    <span class="percentbar__text" :style="textStyle">{{value | valueDisplay(mode)}}</span>
  </div>
</template>

<script>
export default {
  name: "Percentbar",

  filters: {
    valueDisplay(val, mode) {
      if (mode === "percent") {
        return (val * 100).toFixed(2) + "%";
      } else if (mode === "normal") {
        return val;
      }
    }
  },

  computed: {
    innerStyle() {
      return {
        [this.vertical ? "height" : "width"]:
          (this.value / this.maxValue) * 100 + "%",
        borderColor: this.color,
        background: `linear-gradient(to ${
          this.vertical ? "top" : "right"
        }, rgba(0,0,0,0), ${this.color.toAlpha(0.3)})`
      };
    },
    textStyle() {
      return {
        [this.vertical ? "bottom" : "left"]: `calc(${(this.value /
          this.maxValue) *
          100 +
          "%"} + 0.05rem)`
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
    //RGB颜色字符串
    color: {
      type: String,
      default: "rgb(26, 146, 255)"
    },
    mode: {
      type: String,
      default: "percent"
    }
  }
};
</script>