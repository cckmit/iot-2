<template>
  <div class="page">
    <ChartBar :loading="loading" :rows="rows" :columns="columns" :settings="settings" />
  </div>
</template>

<script>
/**
 * 页面内容：本年度单位运行情况
 */
import { colorMap } from "@/plugins/echarts";
import ChartBar from "@/components/Chart/ChartBar.vue";
// import { getRandomData } from "@/util";
import { getCustomerYearOperation } from "@/api";

// function testGetRow(i) {
//   return {
//     month: i,
//     warning: getRandomData({ min: 10, max: 500 }),
//     error: getRandomData({ min: 10, max: 500 }),
//     both: getRandomData({ min: 10, max: 500 }),
//     warningCount: getRandomData({ min: 10, max: 500 }),
//     errorCount: getRandomData({ min: 10, max: 500 })
//   };
// }

export default {
  name: "Customer_02",

  components: {
    ChartBar
  },

  data() {
    return {
      loading: false,
      rows: [],
      columns: [],
      settings: {
        dimension: ["month"]
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
        },
        {
          label: "报警案件数",
          prop: "warningCount",
          type: "line",
          color: colorMap.warning
        },
        {
          label: "故障案件数",
          prop: "errorCount",
          type: "line",
          color: colorMap.error
        }
      ];

      getCustomerYearOperation().then(res => {
        this.rows = res.data.rows;
        this.loading = false;
      });
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>