<template>
  <div class="page">
    <ChartPie :data="data" :loading="loading" :settings="settings" :onClick="onPieClick" />
  </div>
</template>

<script>
/**
 * 页面内容：各设备数量
 */
import ChartPie from "@/components/Chart/ChartPie.vue";
import { getEquipmentCategoryRate } from "@/api";

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
      getEquipmentCategoryRate()
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
          placement: "center",
          data: {
            Category: meta.SId
          },
          id: "CenterModal",
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