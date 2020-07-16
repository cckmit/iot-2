<template>
  <div class="chart">
    <div class="chart-pie" ref="pie" v-loading="loading"></div>
  </div>
</template>

<script>
import echarts from "@/plugins/echarts";

export default {
  props: {
    loading: Boolean,
    data: Array,
    metrics: String,
    dimension: String
  },

  data() {
    return {
      pie: null,

      pieOption: {
        // color: [
        //   colorMap.normal,
        //   colorMap.warning,
        //   colorMap.error,
        //   colorMap.both
        // ],
        legend: {},
        tooltip: {
          show: true,
          formatter: "{b}：{c} ({d}%)",
          textStyle: {
            fontSize: this.$root.getNumberByRem("14rem")
          }
        },
        graphic: [
          {
            type: "text",
            left: "center",
            top: "40%",
            style: {
              text: `0`,
              fontSize: this.$root.getNumberByRem("20rem"),
              fontWeight: "bold",
              textAlign: "center",
              fill: "#fff"
            }
          },
          {
            type: "text",
            left: "center",
            top: "55%",
            style: {
              text: `接入总数`,
              textAlign: "center",
              fontSize: this.$root.getNumberByRem("12rem"),
              fill: "rgba(255,255,255,0.8)"
            }
          }
        ],
        series: [
          {
            type: "pie",
            selectedMode: "single",
            selectedOffset: this.$root.getNumberByRem("10rem"),
            radius: ["50%", "75%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.4
              },
              emphasis: {
                opacity: 1
              }
            },
            data: []
          },
          {
            type: "pie",
            selectedMode: "single",
            selectedOffset: 0,
            hoverAnimation: false,
            radius: ["75%", "80%"],
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "rgb(0,0,0,0)"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    };
  },

  watch: {
    data: {
      handler() {
        this.refresh();
      },
      deep: true
    },
    metrics: {
      handler() {
        this.refresh();
      },
      deep: true
    },
    dimension: {
      handler() {
        this.refresh();
      },
      deep: true
    }
  },

  methods: {
    refresh() {
      const data = this.data.map(i => {
        return {
          name: i[this.dimension],
          value: i[this.metrics]
        };
      });

      this.pieOption.series[0].data = data;
      this.pieOption.series[1].data = data;
      this.pieOption.graphic[0].style.text = "标题";

      this.pie.setOption(this.pieOption);
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.pie = echarts.init(this.$refs.pie, "xiyu");
      this.pie.setOption(this.pieOption);

      this.refresh();
    });
  }
};
</script>

<style lang="scss" scoped>
.chart {
  .chart-pie {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>