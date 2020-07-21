<template>
  <div class="page">
    <ColumnItem :title="title" superTitle style="height:2rem;" :splitLine="false" vertical>
      <div class="summary-info">
        <div class="summary-item">
          <div class="summary-item__start">
            <SvgIcon icon-class="louyu-circle"></SvgIcon>
          </div>
          <div class="summary-item__end">
            <div class="summary-item__value">{{vm.prop1}}</div>
            <div class="summary-item__label">接入单位数</div>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-item__start">
            <SvgIcon icon-class="shebei-circle"></SvgIcon>
          </div>
          <div class="summary-item__end">
            <div class="summary-item__value">{{vm.prop2}}</div>
            <div class="summary-item__label">接入设备数</div>
          </div>
        </div>
      </div>

      <div class="remark-info">
        <p>
          <span class="th">街道地址：</span>
          {{vm.prop3}}
        </p>
        <p>
          <span class="th">备注：</span>
          {{vm.prop4}}
        </p>
      </div>
    </ColumnItem>

    <div class="flex-container" style="height:calc(100% - 2rem);flex-direction:column;">
      <div class="flex-container" style="height:32%">
        <ColumnItem title="企业行业占比" splitOnBody>
          <div class="pie-container">
            <ChartPie
              ref="pie1"
              :data="pie1.data"
              :onClick="pie1.onPieClick"
              :loading="pie1.loading"
              :settings="pie1.settings"
              smallTitle
            />
          </div>
        </ColumnItem>
        <ColumnItem title="设备分类占比">
          <div class="pie-container">
            <ChartPie
              ref="pie2"
              :data="pie2.data"
              :onClick="pie2.onPieClick"
              :loading="pie2.loading"
              :settings="pie2.settings"
              smallTitle
            />
          </div>
        </ColumnItem>
      </div>
      <div class="flex-container" style="height:68%;flex-direction:column;">
        <ColumnItem title="本年度单位运行情况" :splitLine="false" vertical>
          <div class="bar-container">
            <ChartBar
              :loading="bar.loading"
              :rows="bar.rows"
              :columns="bar.columns"
              :settings="bar.settings"
            />
          </div>
        </ColumnItem>
        <ColumnItem title="案件列表" vertical>
          <div class="table-container">
            <FxTable
              class="table-sm"
              ref="table"
              :columns="table.columns"
              :query.sync="table.query"
              :options="table.options"
            ></FxTable>
          </div>

          <el-radio-group
            v-model="table.query.Category"
            @change="refreshTable"
            class="radio-group-sm"
            style="position:absolute;right:0;top:-.3rem"
          >
            <el-radio-button label>全部</el-radio-button>
            <el-radio-button label="1">报警</el-radio-button>
            <el-radio-button label="2">故障</el-radio-button>
          </el-radio-group>
        </ColumnItem>
      </div>
    </div>
  </div>
</template>

<script>
import ChartPie from "@/components/Chart/ChartPie.vue";
import ChartBar from "@/components/Chart/ChartBar.vue";
import { colorMap } from "@/plugins/echarts";
import { getRandomData } from "@/util";

export default {
  components: {
    ChartPie,
    ChartBar
  },

  props: {
    title: {}
  },

  data() {
    return {
      vm: {
        prop1: 55,
        prop2: 5369,
        prop3: "黑龙江省哈尔滨市松北区",
        prop4:
          "距市区10千米。面积127平方千米。辖15个社区、6个行政村。滨洲铁路、202国道、222国道过境"
      },

      pie1: {
        data: [],
        settings: {
          metrics: "Count",
          dimension: "Name",
          title: "10",
          unit: "类",
          subtitle: "行业总数",
          titlePosition: {
            left: "47%",
            top: "33%"
          },
          radius: ["50%", "65%"],
          center: ["50%", "50%"],
          legendShow: false,
          titleShow: true
        },
        onClick() {},
        loading: false
      },
      pie2: {
        data: [],
        settings: {
          metrics: "Count",
          dimension: "Name",
          title: "",
          unit: "类",
          subtitle: "设备类型",
          titlePosition: {
            left: "47%",
            top: "33%"
          },
          radius: ["50%", "65%"],
          center: ["50%", "50%"],
          legendShow: false,
          titleShow: true
        },
        onClick() {},
        loading: false
      },
      bar: {
        loading: false,
        rows: [],
        columns: [],
        settings: {
          dimension: ["month"]
        }
      },
      table: {
        query: {
          Category: ""
        },

        options: {
          api: "/api/Business",
          background: "transparent",
          border: false,
          outBorder: false,
          highlightCurrentRow: false,
          toolbar: false,
          pagination: false,

          resHandler() {
            const rows = [
              {
                ID: "1",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              },
              {
                ID: "2",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              },
              {
                ID: "3",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 2,
                handleStatus: 2
              },
              {
                ID: "1",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              },
              {
                ID: "2",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 3,
                handleStatus: 1
              },
              {
                ID: "3",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              },
              {
                ID: "1",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              },
              {
                ID: "2",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              },
              {
                ID: "3",
                type: "故障点胡探测器",
                company: "金山区驻京县敬老院",
                place: "金山区驻京县开发区",
                contact: "张东升",
                tel: "15288565524",
                time: new Date().format("yyyy-MM-dd"),
                status: 1,
                handleStatus: 2
              }
            ];

            return rows;
          }
        },

        columns: [
          {
            label: "设备ID",
            prop: "ID",
            minWidth: 70,
            align: "center"
          },
          {
            label: "设备类型",
            align: "center",
            minWidth: 80,
            resizable: true,
            prop: "type"
          },
          {
            label: "发生时间",
            align: "center",
            minWidth: 120,
            prop: "time"
          },
          {
            label: "处理状态",
            align: "center",
            minWidth: 100,
            prop: "handleStatus",
            render: (h, context) => {
              const obj = {
                1: {
                  txt: "未处理",
                  class: "color-2"
                },
                2: {
                  txt: "已处理",
                  class: "color-4"
                }
              }[context.value];
              return <span class={obj.class}>{obj.txt}</span>;
            }
          }
        ]
      }
    };
  },

  computed: {},

  methods: {
    refresh() {
      this.refreshPie1();
      this.refreshPie2();
      this.refreshBar();
      this.refreshTable();
    },

    //刷新饼图1
    refreshPie1() {
      this.pie1.loading = true;

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
          meta: {
            SId: 1
          },
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

      this.pie1.data = data;

      this.pie1.loading = false;
    },

    //刷新饼图2
    refreshPie2() {
      this.pie2.loading = true;

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
          meta: {
            SId: 1
          },
          Name: "设备1"
        },
        {
          Count: 12,
          meta: {
            SId: 2
          },
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

      this.pie2.data = data;
      this.pie2.settings.title = data.length;

      this.pie2.loading = false;
    },

    //刷新柱图
    refreshBar() {
      function testGetRow(i) {
        return {
          month: i,
          warning: getRandomData({ min: 10, max: 500 }),
          error: getRandomData({ min: 10, max: 500 }),
          both: getRandomData({ min: 10, max: 500 }),
          warningCount: getRandomData({ min: 10, max: 500 }),
          errorCount: getRandomData({ min: 10, max: 500 })
        };
      }

      this.bar.loading = true;

      this.bar.columns = [
        {
          label: "仅报警单位数",
          prop: "warning",
          type: "bar",
          color: colorMap.warning
        },
        {
          label: "仅故障单位数",
          prop: "error",
          type: "bar",
          color: colorMap.error
        },
        {
          label: "报警且故障单位数",
          prop: "both",
          type: "bar",
          color: colorMap.both
        },
        {
          label: "报警案件数",
          prop: "warningCount",
          type: "line",
          color: colorMap.warning
        },
        {
          label: "故障案件数",
          prop: "errorCount",
          type: "line",
          color: colorMap.error
        }
      ];

      let arr = [];

      for (let i = 0; i < 12; i++) {
        arr.push(testGetRow(i + 1 + "月"));
      }

      this.bar.rows = arr;

      setTimeout(() => {
        this.bar.loading = false;
      }, 1000);
    },

    //刷新表格
    refreshTable() {
      this.$refs.table.refreshTable();
    }
  },

  mounted() {
    this.refreshPie1();
    this.refreshPie2();
    this.refreshBar();
  }
};
</script>

<style lang="scss" scoped>
.page {
  flex-direction: column;
}
.summary-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.03rem;
  .summary-item {
    display: flex;
    align-items: center;
    width: 48%;
    padding: 0.1rem 0.1rem;
    border-radius: 0.06rem;
    border: 0.01rem solid rgb(37, 103, 147);
    background-color: rgb(11, 24, 39);
    box-shadow: inset 0 0 0.14rem 0.03rem rgba(76, 164, 252, 0.3);
    .summary-item__start {
      display: flex;
      padding-right: 0.14rem;
      // border-right: 0.01rem solid rgb(120, 158, 181);
      font-size: 0.34rem;
      justify-content: flex-end;
      width: 40%;
      position: relative;
      &:before {
        content: "";
        display: block;
        width: 0.01rem;
        height: 70%;
        background: rgb(120, 158, 181);
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
      }

      .svg-icon {
        display: flex;
      }
    }
    .summary-item__end {
      display: flex;
      flex-direction: column;
      padding-left: 0.14rem;
      .summary-item__label {
        line-height: 1.2;
        font-size: 0.12rem;
      }
      .summary-item__value {
        color: #fff;
        font-size: 0.22rem;
        font-weight: bold;
        line-height: 1;
      }
    }
  }
}

.remark-info {
  background: rgb(22, 32, 40);
  border-radius: 0.06rem;
  padding: 0.1rem;
  margin-top: 0.1rem;
  font-size: 0.12rem;

  p {
    padding: 0;
    margin: 0 0 0.05rem 0;
  }

  .th {
    color: rgb(76, 164, 252);
  }
}

.pie-container {
  position: absolute;
  left: 0;
  right: 0;
  top: -0.2rem;
  bottom: -0.2rem;
}

.bar-container {
  position: absolute;
  left: 0;
  right: 0;
  top: -0.1rem;
  bottom: -0.2rem;
}

.table-container {
  position: absolute;
  left: -0.1rem;
  right: -0.1rem;
  top: 0;
  bottom: 0;
}
</style>