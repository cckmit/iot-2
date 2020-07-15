<template>
  <div class="page">
    <div class="chart" ref="bar" v-loading="loading"></div>
  </div>
</template>

<script>
import echarts, { colorMap } from "@/plugins/echarts";
import { getCustomerOperation } from "@/api";
import { getRandomData } from "@/util";

//页面内容：本年度单位运行情况
export default {
  name: "Customer_02",
  data() {
    return {
      bar: null,
      loading: false,

      barOption: {
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   crossStyle: {
          //     color: "#999"
          //   }
          // }
          padding: this.$root.getNumberByRem("5rem"),
          textStyle: {
            fontSize: this.$root.getNumberByRem("14rem")
          }
        },
        grid: {
          top: "30%",
          bottom: "10%",
          left: 0,
          right: 0,
          containLabel: true
        },
        legend: [
          {
            data: ["仅报警单位数", "仅故障单位数", "报警且故障单位数"],
            right: 0,
            top: 0,
            width: "40%",
            height: "15%",
            itemWidth: this.$root.getNumberByRem("16rem"),
            itemHeight: this.$root.getNumberByRem("8rem"),
            itemGap: this.$root.getNumberByRem("20rem"),
            textStyle: {
              fontSize: this.$root.getNumberByRem("12rem")
            },
            orient: "vertical"
          },
          {
            data: ["报警案件数", "故障案件数"],
            right: 0,
            top: "12%",
            width: "40%",
            height: "15%",
            itemWidth: this.$root.getNumberByRem("16rem"),
            itemHeight: this.$root.getNumberByRem("8rem"),
            itemGap: this.$root.getNumberByRem("20rem"),
            textStyle: {
              fontSize: this.$root.getNumberByRem("12rem")
            },
            orient: "vertical"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              fontSize: this.$root.getNumberByRem("12rem")
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位数量",
            min: 0,
            // interval: 50,
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            },
            axisLabel: {
              formatter: "{value}",
              fontSize: this.$root.getNumberByRem("12rem")
            },
            nameTextStyle: {
              color: "rgb(109,151,191)",
              fontSize: this.$root.getNumberByRem("12rem")
            }
          }
        ],
        series: []
      },

      vm: {}
    };
  },

  methods: {
    refresh() {
      this.loading = true;
      getCustomerOperation()
        .then(res => {
          this.vm = res.data;

          this.loading = false;

          this.renderBar();
        })
        .catch(() => {
          this.loading = false;
        });
    },

    renderBar() {
      let data1 = getRandomData({ min: 10, max: 500, length: 12 });
      this.barOption.series = [
        {
          name: "仅报警单位数",
          type: "bar",
          stack: "仅报警单位数",
          barMaxWidth: this.$root.getNumberByRem("15rem"),
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: colorMap.warning.toAlpha(0.3) // 0% 处的颜色
              },
              {
                offset: 1,
                color: colorMap.warning.toAlpha(0) // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          data: data1
        },
        // {
        //   name: "仅报警单位数_border",
        //   type: "bar",
        //   stack: "仅报警单位数",
        //   color: colorMap.warning,
        //   data: data1.map(() => 10)
        // }
        {
          name: "仅故障单位数",
          type: "bar",
          color: colorMap.error,
          barMaxWidth: this.$root.getNumberByRem("15rem"),
          data: getRandomData({ min: 10, max: 500, length: 12 })
        },
        {
          name: "报警且故障单位数",
          type: "bar",
          color: colorMap.both,
          barMaxWidth: this.$root.getNumberByRem("15rem"),
          data: getRandomData({ min: 10, max: 500, length: 12 })
        },
        {
          name: "报警案件数",
          type: "line",
          color: colorMap.warning,
          barMaxWidth: this.$root.getNumberByRem("15rem"),
          data: getRandomData({ min: 10, max: 500, length: 12 })
        },
        {
          name: "故障案件数",
          type: "line",
          color: colorMap.error,
          barMaxWidth: this.$root.getNumberByRem("15rem"),
          data: getRandomData({ min: 10, max: 500, length: 12 })
        }
      ];

      this.bar.setOption(this.barOption);
    }
  },
  mounted() {
    this.bar = echarts.init(this.$refs.bar, "xiyu");
    this.bar.setOption(this.barOption);

    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
  position: relative;
  .chart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: -0.2rem;
    // height: 100%;
    // width: 100%;
  }
}
</style>