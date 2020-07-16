<template>
  <div class="page">
    <ChartRadar :data="data" :loading="loading" :settings="settings" />
  </div>
</template>

<script>
import ChartRadar from "@/components/Chart/ChartRadar.vue";

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

      const data = [
        {
          Count: 10,
          SId: 1,
          Name: "设备1"
        },
        {
          Count: 12,
          SId: 2,
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
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
  position: relative;
}
</style>