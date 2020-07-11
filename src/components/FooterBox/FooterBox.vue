<template>
  <div class="footer-box">
    <!-- <div class="footer-box--handler">
          <div class="footer-box--close el-icon-close"></div>
    </div>-->

    <div class="footer-box--bg">
      <!-- <div class="footer-box--bg__inner1"></div>
      <div class="footer-box--bg__inner2"></div>-->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1821.34 229"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="910.67"
            y1="232"
            x2="910.67"
            y2="11.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#0a1c3e" stop-opacity="0.9" />
            <stop offset="0.29" stop-color="#0a152c" stop-opacity="0.9" />
            <stop offset="0.64" stop-color="#0a101f" stop-opacity="0.9" />
            <stop offset="1" stop-color="#0a0e1b" stop-opacity="0.9" />
          </linearGradient>
        </defs>
        <g id="图层_1-2" data-name="图层 1">
          <path
            class="cls-1"
            d="M1817.12,229H2.82c-2.33,0-3.63-1.63-2.27-4.36l25.92-46.85,23.29-21.24L127.67,14.84C132.79,5.7,138.13,0,147.12,0H1805.05a16.57,16.57,0,0,1,16.29,16.83V224.64A4.29,4.29,0,0,1,1817.12,229Z"
          />
          <path
            class="cls-2"
            d="M46.64,154.13l-12,10.62a1.56,1.56,0,0,1-2.39-1.94L85.59,65.75a1.53,1.53,0,0,1,.34-.42l12-10.63a1.57,1.57,0,0,1,2.4,1.95L47,153.71A1.53,1.53,0,0,1,46.64,154.13Z"
          />
        </g>
      </svg>
    </div>

    <div class="footer-box--body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBox"
};
</script>

<style scoped>
.cls-1 {
  fill: url(#linear-gradient);
  box-shadow: 0 0 0.12rem 0.05rem rgba(0, 144, 211, 0.55);
}
.cls-2 {
  fill: #71b2ff;
}
</style>