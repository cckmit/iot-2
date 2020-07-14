<template>
  <div class="page">
    <div class="chart" ref="pie"></div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="status" label="单位数"></el-table-column>
        <el-table-column prop="status" label="处理进度"></el-table-column>
        <el-table-column prop="status" label="已处理/总数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import echarts, { colors2 } from "@/plugins/echarts";

//页面内容：单位运行情况
export default {
  name: "Customer_01",
  data() {
    return {};
  },

  computed: {
    pieOption() {
      const data = [
        { name: "项目申报", value: 3 },
        { name: "项目初审", value: 3 },
        { name: "项目上会", value: 3 },
        { name: "协议签订", value: 3 },
        { name: "项目代办", value: 3 },
        { name: "项目服务", value: 3 }
      ];

      return {
        legend: {
          show: false
        },
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
              text: `59`,
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
            selectedOffset: 5,
            radius: ["50%", "75%"],
            label: {
              normal: {
                show: false,
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: 16
                },
                formatter: param => {
                  //   this.name = param.name;
                  //   this.number = param.percent;
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.4
              }
            },
            data: data
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
            data: data
          }
        ]
      };
    },

    tableData() {
      return [{ status: "仅报警" }];
    }
  },

  methods: {},

  mounted() {
    this.pie = echarts.init(this.$refs.pie, "xiyu");
    this.pie.setOption(this.pieOption);
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
  .chart {
    height: 100%;
    width: 25%;
  }
  .table {
    height: 100%;
    width: 75%;
  }
}
</style>