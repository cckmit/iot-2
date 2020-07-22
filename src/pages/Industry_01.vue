<template>
  <div class="page">
    <ChartPie :data="data" :onClick="onPieClick" :loading="loading" :settings="settings" />
  </div>
</template>

<script>
/**
 * 页面内容：各行业单位数占比
 */
import ChartPie from "@/components/Chart/ChartPie.vue";
import { getIndustryCustomerRate } from "@/api";
// import http from "@/server";

// import Mock from "mockjs";

// Mock.mock("/api/abc", "get", function() {
//   return Mock.mock({
//     bl: true,
//     isSuccess: true,
//     data: {
//       "rows|10": [
//         {
//           'Count|5-100': 10,
//           meta: {
//             SId: 1
//           },
//           'Name': "@cname"
//         }
//       ]
//     }
//   });
// });

export default {
  components: {
    ChartPie
  },

  data() {
    return {
      data: [],
      loading: false,

      settings: {
        metrics: "Count",
        dimension: "Name",
        title: "10",
        unit: "类",
        subtitle: "行业总数",
        titlePosition: {
          left: "11.3%",
          top: "35%"
        },
        radius: ["53%", "70%"],
        center: ["12.2%", "50%"],
        legendShow: true,
        titleShow: true
      }
    };
  },

  methods: {
    refresh() {
      this.loading = true;

      getIndustryCustomerRate()
        .then(res => {
          if (res.bl) {
            this.data = res.data.rows;
          }

          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    onPieClick(e) {
      const meta = e.data.meta;

      if (meta) {
        this.$modal({
          component: "Industry_01_1",
          placement: "center",
          data: meta,
          id: "CenterModal"
        });
      }
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>