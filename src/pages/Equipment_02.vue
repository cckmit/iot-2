<template>
  <div class="page">
    <ChartRadar :data="data" :loading="loading" :settings="settings" />
  </div>
</template>

<script>
/**
 * 页面内容：设备在线率
 */
import ChartRadar from "@/components/Chart/ChartRadar.vue";
import { getEquipmentCategoryOnlineRate } from "@/api";

export default {
  components: {
    ChartRadar
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
        name: "设备在线率"
      };
    }
  },

  methods: {
    refresh() {
      this.loading = true;
      getEquipmentCategoryOnlineRate()
        .then(res => {
          if (res.bl) {
            this.data = res.data.rows;
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