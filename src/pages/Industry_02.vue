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
import { getIndustryCustomerOperation } from "@/api";

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

      getIndustryCustomerOperation()
        .then(res => {
          if (res.bl) {
            this.rows = res.data.rows;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>