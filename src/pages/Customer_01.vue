<template>
  <div class="page">
    <div class="chart"></div>
    <div class="table"></div>
  </div>
</template>

<script>
import echarts from "echarts";

//页面内容：单位运行情况
export default {
  name: "Customer_01",
  data() {
    return {};
  },
  
  methods: {},

  mounted() {}
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  .chart {
    width: 35%;
  }
  .table {
    width: 65%;
  }
}
</style>