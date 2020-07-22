<template>
  <div class="loop">
    <div class="loop-code">{{code}}</div>
    <div class="loop-bar-top"></div>
    <div class="loop-bar-bottom"></div>
    <div class="loop-switch" :class="state"></div>
    <div class="loop-states" :class="state">
      <SvgIcon icon-class="arrow-down" />
      <span class="point"></span>
    </div>
    <div class="loop-icons">
      <SvgIcon v-for="(i,index) in icons" :key="index" :icon-class="IconMap[i]" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: {},
    state: {},
    icons: {}
  },

  data() {
    return {
      IconMap: {
        A: "a",
        B: "v",
        C: "lightning",
        D: "temperature"
      }
    };
  }
};
</script>

<style lang="scss">
.loop {
  $width: 0.5rem;
  $height: 2.4rem;
  $barWidth: 0.04rem;
  $gutter: 0.24rem;

  display: inline-flex;
  width: $width;
  height: $height;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 0.1rem;
  padding: 0.1rem 0;
  cursor: pointer;
  border-radius: .04rem;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(26, 146, 255, 0.1);
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: $barWidth;
    width: $width;
    background: rgb(1, 44, 86);
    left: 0;
    z-index: -1;
  }

  &:before {
    top: 0.7rem;
  }
  &:after {
    top: 1.14rem;
  }

  .loop-code {
    width: 0.18rem;
    height: 0.2rem;
    color: rgba(#fff, 0.8);
    border: 0.01rem solid rgb(78, 131, 150);
    border-radius: 0.06rem;
    background: rgb(7, 21, 38);
    line-height: 0.2rem;
    text-align: center;
    font-size: 0.12rem;
    letter-spacing: -0.01rem;
  }
  .loop-bar-top,
  .loop-bar-bottom {
    background: rgb(1, 44, 86);
    border: 0.01rem solid rgb(78, 131, 150);
    border-radius: $barWidth/2;
    width: $barWidth;
  }
  .loop-bar-top {
    margin-top: 0.08rem;
    height: 0.5rem;
  }
  .loop-bar-bottom {
    margin-top: $gutter;
    height: 0.24rem;
  }
  .loop-switch {
    width: $barWidth * 1.5;
    height: $barWidth * 1.5;
    border-radius: 50%;
    background: rgb(123, 195, 255);
    position: absolute;
    top: 0.78rem;

    &:before {
      content: "";
      width: $barWidth * 1.5;
      height: $barWidth * 1.5;
      border-radius: 50%;
      background: rgb(123, 195, 255);
      position: absolute;
      top: $gutter;
    }

    &:after {
      content: "";
      width: $barWidth * 0.8;
      border-radius: $barWidth/2;
      background: rgb(123, 195, 255);
      position: absolute;
      top: 0.03rem;
      left: $barWidth * (1/3);
      height: $gutter;
      transition: all 0.2s ease;
      transform-origin: top;
    }

    &.off {
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
  .loop-states {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0.45rem;
    padding: 0 0.06rem 0 0.04rem;
    &.off {
      .point {
        background: rgb(122, 122, 122);
      }
    }
    .svg-icon {
      font-size: 0.2rem;
    }

    .point {
      width: 0.08rem;
      height: 0.08rem;
      background: rgb(67, 255, 183);
      border-radius: 50%;
    }
  }
  .loop-icons {
    height: 1rem;
    overflow: hidden;
    margin-top: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .svg-icon {
      font-size: 0.2rem;
      margin-bottom: 0.05rem;
    }
  }
}
</style>