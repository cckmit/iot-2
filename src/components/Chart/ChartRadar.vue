<template>
  <div class="chart">
    <div class="chart-radar" ref="radar" v-loading="loading"></div>
  </div>
</template>

<script>
import echarts from "@/plugins/echarts";

export default {
  props: {
    loading: Boolean,
    data: Array,
    settings: {}
  },

  data() {
    return {
      radar: null,

      radarOption: {
        tooltip: {
          appendToBody: true
        },
        radar: {
          name: {
            textStyle: {
              color: "rgb(166,221,255)"
            }
          },
          indicator: [],

          splitArea: {
            areaStyle: {
              color: "transparent"
            }
          },

          axisLine: {
            lineStyle: {
              color: "rgb(57,75,95)"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgb(57,75,95)"
            }
          },
          radius: "60%"
        },

        series: [
          {
            name: "设备在线率",
            type: "radar",
            itemStyle: {
              color: "rgb(58,172,255)"
            },
            areaStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(58,172,255,.4)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(58,172,255,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
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
    settings: {
      handler() {
        this.refresh();
      },
      deep: true
    }
  },

  methods: {
    refresh() {
      const { metrics, dimension, name } = this.settings;

      this.radarOption.radar.indicator = this.data.map(i => {
        return {
          name: i[dimension]
        };
      });

      this.radarOption.series[0].name = name;
      this.radarOption.series[0].data = [
        {
          name,
          value: this.data.map(i => i[metrics])
        }
      ];

      if (this.radar) {
        this.radar.setOption(this.radarOption);
        this.radar.resize();
      }
    },

    onWindowResize() {
      this.radar.resize();
    }
  },

  mounted() {
    this.radar = echarts.init(this.$refs.radar, "xiyu");
    window.addEventListener("resize", this.onWindowResize);

    this.refresh();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  }
};
</script>

<style lang="scss" scoped>
.chart {
  .chart-radar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>