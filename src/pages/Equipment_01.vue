<template>
  <div class="page">
    <ChartPie :data="data" :loading="loading" :settings="settings" :onClick="onPieClick" />
  </div>
</template>

<script>
import ChartPie from "@/components/Chart/ChartPie.vue";
// import { getIndustryCustomerRate } from "@/api";

//页面内容：各设备数量
export default {
  components: {
    ChartPie
  },

  data() {
    return {
      data: [],
      loading: false
    };
  },

  computed: {
    settings() {
      return {
        metrics: "Count",
        dimension: "Name",
        title: this.data.length,
        unit: "类",
        subtitle: "设备类型",
        titlePosition: {
          left: "18.6%",
          top: "35%"
        },
        radius: ["53%", "70%"],
        center: ["20%", "50%"],
        legendShow: true,
        titleShow: true,
        legendPreset: 2
      };
    }
  },

  methods: {
    refresh() {
      this.loading = true;

      // getIndustryCustomerRate()
      //   .then(res => {
      //     if (res.bl) {

      //     }

      //     this.loading = false;
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
      const data = [
        {
          Count: 10,
          meta: {
            SId: 1
          },
          Name: "设备1"
        },
        {
          Count: 12,
          meta: {
            SId: 2
          },
          Name: "设备2"
        },
        {
          Count: 5,
          SId: 3,
          Name: "设备3"
        },
        {
          Count: 7,
          SId: 4,
          Name: "设备4"
        },
        {
          Count: 23,
          SId: 5,
          Name: "设备5"
        },
        {
          Count: 17,
          SId: 6,
          Name: "设备6"
        },
        {
          Count: 10,
          SId: 7,
          Name: "设备7"
        }
      ];

      this.data = data;

      this.loading = false;
    },

    onPieClick(e) {
      const meta = e.data.meta;
      if (meta) {
        this.$modal({
          placement: "center",
          data: {
            Category: "d047dd07-b7de-4bf7-9a19-455de4ed25cc" || meta.SId
          },
          id: "CenterModal",
          width: "10rem",
          component: "Equipment_01_1"
        });
      }
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>