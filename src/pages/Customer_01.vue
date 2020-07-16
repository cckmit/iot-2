<template>
  <div class="page">
    <div class="chart" ref="pie" v-loading="loading"></div>
    <div class="table" v-loading="loading">
      <el-table :data="tableData" :cell-class-name="cellClassName">
        <el-table-column prop="status" min-width="20%" align="center" label="状态"></el-table-column>
        <el-table-column prop="count" min-width="15%" align="center" label="单位数"></el-table-column>
        <el-table-column prop="progress" min-width="50%" align="center" label="处理进度">
          <template v-slot="{row}">
            <Percentbar :value="row.progress" />
          </template>
        </el-table-column>
        <el-table-column prop="aaa" min-width="20%" align="right" label="已处理/总数">
          <template v-slot="{row}">
            <span>
              <span style="color:rgb(26,255,172)">{{row.handled}}</span>
              /{{row.all}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-radio-group class="radio-group" v-model="query.days" @change="refresh">
      <el-radio-button :label="30">近30天</el-radio-button>
      <el-radio-button :label="60">近60天</el-radio-button>
      <el-radio-button :label="90">近90天</el-radio-button>
      <el-radio-button :label="120">近120天</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import echarts, { colorMap } from "@/plugins/echarts";
import { getCustomerOperation } from "@/api";

//页面内容：单位运行情况
export default {
  name: "Customer_01",
  data() {
    return {
      pie: null,

      vm: {},

      tableData: [],

      query: {
        days: 30
      },

      loading: false,

      pieOption: {
        color: [
          colorMap.normal,
          colorMap.warning,
          colorMap.error,
          colorMap.both
        ],
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
            label: {
              normal: {
                show: false,
                position: "inside",
                textStyle: {
                  color: "#fff",
                  fontSize: this.$root.getNumberByRem("16rem")
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

  methods: {
    cellClassName({ column, row }) {
      if (column.property === "status") {
        switch (row[column.property]) {
          case "仅报警":
            return "color-1";
          case "仅故障":
            return "color-2";
          case "报警且故障":
            return "color-3";
        }
      }
    },

    refresh() {
      this.loading = true;
      getCustomerOperation(this.query.days)
        .then(res => {
          this.vm = res.data;

          this.loading = false;

          this.renderPie();
          this.renderTable();
        })
        .catch(() => {
          this.loading = false;
        });
    },

    renderPie() {
      const { both, normal, error, warning, total } = this.vm;

      const data = [
        { name: "正常", value: normal || 0 },
        { name: "仅报警", value: warning || 0 },
        { name: "仅故障", value: error || 0 },
        { name: "报警且故障", value: both || 0 }
      ];

      this.pieOption.series[0].data = data;
      this.pieOption.series[1].data = data;
      this.pieOption.graphic[0].style.text = total;
      this.pie.setOption(this.pieOption);
      this.pie.resize();
    },

    renderTable() {
      const {
        both,
        bothAll,
        bothHandled,
        error,
        errorAll,
        errorHandled,
        warning,
        warningAll,
        warningHandled
      } = this.vm;

      const rows = [
        {
          status: "仅报警",
          count: warning,
          progress: !warningAll ? 0 : warningHandled / warningAll,
          all: warningAll,
          handled: warningHandled
        },
        {
          status: "仅故障",
          count: error,
          progress: !errorAll ? 0 : errorHandled / errorAll,
          all: errorAll,
          handled: errorHandled
        },
        {
          status: "报警且故障",
          count: both,
          progress: !bothAll ? 0 : bothHandled / bothAll,
          all: bothAll,
          handled: bothHandled
        }
      ];

      this.tableData = rows;
    }
  },

  mounted() {
    this.pie = echarts.init(this.$refs.pie, "xiyu");

    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
  .chart {
    height: 100%;
    // width: 25%;
    flex: 25%;
  }
  .table {
    height: 100%;
    flex: 75%;
    // width: 75%;
    padding-top: 0.1rem;

    td * {
      font-size: 0.12rem;
    }
  }

  .radio-group {
    position: absolute;
    top: 0.2rem;
    right: 0.4rem;
  }
}
</style>