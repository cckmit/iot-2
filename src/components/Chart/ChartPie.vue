<template>
  <div class="chart">
    <div class="chart-pie" ref="pie" v-loading="loading"></div>
  </div>
</template>

<script>
import echarts, { colors } from "@/plugins/echarts";

export default {
  props: {
    loading: Boolean,
    data: Array,
    settings: {}
  },

  data() {
    return {
      pie: null,

      pieOption: {
        title: {
          textAlign: "center",
          textStyle: {
            color: "#fff",
            rich: {
              a: {
                fontWeight: "bold",
                fontSize: this.$root.getNumberByRem("26rem")
              },
              b: {
                textIndent: -10,
                fontSize: this.$root.getNumberByRem("12rem")
              }
            }
          },
          subtextStyle: {
            color: "#fff",
            lineHeight: this.$root.getNumberByRem("0rem"),
            fontSize: this.$root.getNumberByRem("14rem")
          }
        },
        legend: [
          {
            data: [],
            top:'8%',
            left: "30%",
            width: "30%",
            textStyle: {
              rich: {
                a: {
                  color: "#fff"
                }
              }
            },
            itemWidth: this.$root.getNumberByRem("18rem"),
            itemHeight: this.$root.getNumberByRem("10rem"),
            itemGap: this.$root.getNumberByRem("16rem")
          },
          {
            data: [],
            top:'8%',
            left: "60%",
            width: "30%",
            textStyle: {
              rich: {
                a: {
                  color: "#fff"
                }
              }
            },
            itemWidth: this.$root.getNumberByRem("18rem"),
            itemHeight: this.$root.getNumberByRem("10rem"),
            itemGap: this.$root.getNumberByRem("16rem")
          }
        ],
        tooltip: {
          show: true,
          formatter: "{b}：{c} ({d}%)",
          textStyle: {
            fontSize: this.$root.getNumberByRem("14rem")
          }
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            selectedOffset: this.$root.getNumberByRem("10rem"),
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              show: false
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
    settings: {
      handler() {
        this.refresh();
      },
      deep: true
    }
  },

  methods: {
    refresh() {
      const { dimension, metrics } = this.settings;

      //处理数据格式
      const data = this.data.map((i, index) => {
        return {
          name: i[dimension],
          value: i[metrics],
          itemStyle: {
            color: colors[index]
          }
        };
      });

      this.handleSeries(data);

      this.handleTitle();

      this.handleLegend(data);

      if (this.pie) {
        this.pie.setOption(this.pieOption);
      }
    },

    //处理系列数据
    handleSeries(data) {
      const { radius, center } = this.settings;

      this.pieOption.series[0].data = data;
      this.pieOption.series[0].radius = radius || ["55%", "75%"];
      this.pieOption.series[0].center = center || ["50%", "50%"];

      this.pieOption.series[1].data = data;
      this.pieOption.series[1].radius = radius
        ? [radius[1], parseInt(radius[1]) + 5 + "%"]
        : ["55%", "75%"];
      this.pieOption.series[1].center = center || ["50%", "50%"];
    },

    //处理标题
    handleTitle() {
      const { title, subtitle, unit, titlePosition, titleShow } = this.settings;

      this.pieOption.title.show = titleShow;
      if (titleShow == false) {
        return;
      }

      this.pieOption.title.text = `{a|${title}} {b|${unit}}`;
      this.pieOption.title.subtext = subtitle;
      this.pieOption.title.top = titlePosition.top;
      this.pieOption.title.left = titlePosition.left;
    },

    //自定义图列显示
    handleLegend(data) {
      const { legendShow } = this.settings;

      this.pieOption.legend[0].show = legendShow;
      this.pieOption.legend[1].show = legendShow;

      if (legendShow != true) {
        return;
      }

      const total = data.reduce((pre, cur) => {
        return pre + cur.value;
      }, 0);
      const legendFormatter = function(name) {
        let item = data.find(i => i.name === name);

        let percentTxt = total
          ? (item.value / total).toFixed(2) + "%"
          : "0.00%";

        return `${name}  {a|${item.value}}     ${percentTxt}`;
      };
      const legendData0 = [],
        legendData1 = [];

      data.forEach((i, index) => {
        if (index < data.length / 2) {
          legendData0.push(i.name);
        } else {
          legendData1.push(i.name);
        }
      });
      this.pieOption.legend[0].formatter = legendFormatter;
      this.pieOption.legend[0].data = legendData0;
      this.pieOption.legend[1].formatter = legendFormatter;
      this.pieOption.legend[1].data = legendData1;
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