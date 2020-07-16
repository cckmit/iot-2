<template>
  <div class="page">
    <ChartPie
      :data="data"
      metrics="Count"
      dimension="Name"
      :loading="loading"
      :title="10"
      subtitle="行业总数"
    />
  </div>
</template>

<script>
import ChartPie from "@/components/Chart/ChartPie.vue";
// import { getIndustryCustomerRate } from "@/api";

//页面内容：各行业单位占比数
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
          SId: 1,
          Name: "饭店超市"
        },
        {
          Count: 10,
          SId: 2,
          Name: "市场楼宇"
        },
        {
          Count: 10,
          SId: 3,
          Name: "娱乐场所"
        },
        {
          Count: 10,
          SId: 4,
          Name: "福利机构"
        },
        {
          Count: 10,
          SId: 5,
          Name: "金融机构"
        },
        {
          Count: 10,
          SId: 6,
          Name: "危化品场所"
        },
        {
          Count: 10,
          SId: 7,
          Name: "出租房"
        },
        {
          Count: 10,
          SId: 8,
          Name: "文教医院"
        },
        {
          Count: 10,
          SId: 9,
          Name: "生产制造业"
        },
        {
          Count: 10,
          SId: 10,
          Name: "其它"
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