<template>
  <div class="page">
    <ChartBar :loading="loading" :rows="rows" :columns="columns" :settings="settings" />
  </div>
</template>

<script>
import { colorMap } from "@/plugins/echarts";
import ChartBar from "@/components/Chart/ChartBar.vue";
import { getRandomData } from "@/util";

//页面内容：各行业单位运行趋势图
export default {
  components: {
    ChartBar
  },

  data() {
    return {
      loading: false,
      rows: [],
      columns: [],
      settings: {
        dimension: ["Name"]
      }
    };
  },

  methods: {
    refresh() {
      this.loading = true;

      this.columns = [
        {
          label: "仅报警单位数",
          prop: "warning",
          type: "bar",
          color: colorMap.warning
        },
        {
          label: "仅故障单位数",
          prop: "error",
          type: "bar",
          color: colorMap.error
        },
        {
          label: "报警且故障单位数",
          prop: "both",
          type: "bar",
          color: colorMap.both
        }
      ];

      this.rows = [
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备1"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备2"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备3"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备4"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备5"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备6"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "设备7"
        }
      ];

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>