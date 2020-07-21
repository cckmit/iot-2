<template>
  <div class="page">
    <ChartBar :loading="loading" :rows="rows" :columns="columns" :settings="settings" />
  </div>
</template>

<script>
/**
 * 页面内容：各行业单位运行趋势图
 */
import { colorMap } from "@/plugins/echarts";
import ChartBar from "@/components/Chart/ChartBar.vue";
import { getRandomData } from "@/util";

export default {
  name: "Industry_02",

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
          Name: "饭店超市"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "市场楼宇"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "娱乐场所"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "福利机构"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "金融机构"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "危化品场所"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "出租房"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "文教医院"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "生产制造业"
        },
        {
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          Name: "其它"
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