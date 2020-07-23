<template>
  <div class="page">
    <ColumnItem
      :title="title"
      superTitle
      smallTitle
      style="height:1.75rem;"
      :splitLine="false"
      vertical
    >
      <div class="summary-info" v-loading="loading">
        <div class="summary-info__start">
          <el-image :src="testImgSrc" fit="cover"></el-image>
        </div>
        <div class="summary-info__end">
          <p>
            <span class="th">所属项目：</span>
            <span class="td">{{vm.prop1}}</span>
          </p>
          <p>
            <span class="th">场所地址：</span>
            <span class="td">{{vm.prop2}}</span>
          </p>
          <p>
            <span class="th">经营范围：</span>
            <span class="td">{{vm.prop3}}</span>
          </p>
          <p>
            <span class="th">负责人：</span>
            <span class="td">{{vm.prop4}}</span>
          </p>
          <p>
            <span class="th">联系电话：</span>
            <span class="td">{{vm.prop5}}</span>
          </p>
        </div>
      </div>
    </ColumnItem>

    <div class="flex-container" style="height:calc(100% - 1.75rem);flex-direction:column;">
      <ColumnItem title="设备/回路" splitOnBody vertical style="flex:0.48;" :splitLine="false">
        <div style="height:.28rem;">
          <el-tabs
            type="border-card"
            class="only-tablabel"
            v-model="activePDX"
            @tab-click="onPowerBoxLoopClick"
          >
            <el-tab-pane v-for="i in PDXList" :label="i.label" :name="i.name" :key="i.label"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="fixed-info">
          设备总数：
          <strong>{{vm.prop6 || '-'}}</strong>&nbsp;个
          <span style="display:inline-block;margin-left:.15rem">回路总数：</span>
          <strong>{{vm.prop7 || '-'}}</strong>&nbsp;条
          <a class="link" style="display:inline-block;margin-left:.1rem;">其它</a>
        </div>

        <div class="flex-container" style="margin-top:.1rem;height:calc(100% - .28rem)">
          <div class="pie-container" v-loading="pie.loading">
            <span class="title">设备类型</span>
            <ChartPie
              :data="pie.data"
              :loading="pie.loading"
              :settings="pie.settings"
              :onClick="onPieClick"
              smallTitle
            />
          </div>
          <div class="bar-container1" v-loading="bar1.loading">
            <span class="title">设备状态</span>

            <div class="bars">
              <div class="bar-item">
                <div class="bar-item__label">仅报警</div>
                <div class="bar-item__value">
                  <Percentbar
                    :value="vm.warning"
                    mode="normal"
                    :color="colorMap.warning"
                    :maxValue="bar1.maxValue"
                  />
                </div>
              </div>
              <div class="bar-item">
                <div class="bar-item__label">仅故障</div>
                <div class="bar-item__value">
                  <Percentbar
                    :value="vm.error"
                    mode="normal"
                    :color="colorMap.error"
                    :maxValue="bar1.maxValue"
                  />
                </div>
              </div>
              <div class="bar-item">
                <div class="bar-item__label" style="line-height:1;">报警且故障</div>
                <div class="bar-item__value">
                  <Percentbar
                    :value="vm.both"
                    mode="normal"
                    :color="colorMap.both"
                    :maxValue="bar1.maxValue"
                  />
                </div>
              </div>
              <div class="bar-item">
                <div class="bar-item__label">正常</div>
                <div class="bar-item__value">
                  <Percentbar
                    :value="vm.normal"
                    mode="normal"
                    :color="colorMap.normal"
                    :maxValue="bar1.maxValue"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bar-container2" v-loading="bar2.loading">
            <span class="title">回路状态</span>

            <div class="bars">
              <div class="bar-item">
                <div class="bar-item__label">通路</div>
                <div class="bar-item__value">
                  <Percentbar
                    :value="vm.tongLu"
                    :color="colorMap.normal"
                    :maxValue="bar2.maxValue"
                    vertical
                  />
                </div>
              </div>
              <div class="bar-item">
                <div class="bar-item__label">断路</div>
                <div class="bar-item__value">
                  <Percentbar :value="vm.duanLu" color="rgb(118,134,145)" vertical />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ColumnItem>
      <ColumnItem title="案件列表" splitOnBody vertical style="flex:0.52;margin-top:.1rem;">
        <FxTable
          class="table-sm"
          ref="table"
          :columns="table.columns"
          :query.sync="table.query"
          :options="table.options"
        ></FxTable>

        <el-radio-group
          v-model="table.query.Category"
          @change="refreshTable"
          class="radio-group-sm"
          style="position:absolute;right:.1rem;top:-.3rem"
        >
          <el-radio-button label>全部</el-radio-button>
          <el-radio-button label="1">报警</el-radio-button>
          <el-radio-button label="2">故障</el-radio-button>
        </el-radio-group>
      </ColumnItem>
    </div>
  </div>
</template>

<script>
/**
 * 场所详情
 */
import testImgSrc from "@/assets/demo/building_2.jpg";
import ChartPie from "@/components/Chart/ChartPie.vue";
import Percentbar from "@/components/Percentbar.vue";
import { colorMap } from "@/plugins/echarts";
import { getPlaceDetail } from "@/api";

export default {
  components: {
    ChartPie,
    Percentbar
  },
  props: {
    title: {},
    id: {}
  },

  watch: {
    id() {
      this.refresh();
    }
  },

  data() {
    return {
      colorMap,

      testImgSrc,

      vm: {},

      PDXList: [],

      activePDX: "",

      pie: {
        data: [],

        loading: false,

        settings: {
          metrics: "Count",
          dimension: "Name",
          title: "",
          unit: "类",
          subtitle: "设备类型",
          titlePosition: {
            left: "36%",
            top: "35%"
          },
          radius: ["43%", "63%"],
          center: ["40%", "50%"],
          legendShow: false,
          titleShow: true,
          legendPreset: 2
        }
      },

      bar1: {
        loading: false,
        maxValue: 100
      },

      bar2: {
        loading: false
      },

      table: {
        query: {
          Category: ""
        },

        options: {
          api: "/api/govShow?optionType=placeWarningList",
          background: "transparent",
          border: false,
          outBorder: false,
          highlightCurrentRow: false,
          toolbar: false,
          pagination: false,

          resHandler(res) {
            return res.rows;
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

  methods: {
    //页面刷新
    refresh() {
      this.refreshSummary();
      this.refreshTable();
    },

    //刷新场所简要信息，以及相关图表信息
    refreshSummary() {
      this.loading = true;
      this.pie.loading = true;
      this.bar1.loading = true;
      this.bar2.loading = true;

      getPlaceDetail()
        .then(res => {
          if (res.bl) {
            const { vm, rows1, PDXList } = res.data;
            //简要信息和两个柱状图
            this.vm = vm;

            this.PDXList = PDXList;

            this.refreshPie(rows1);

            this.refreshBar1();

            this.refreshBar2();
          }

          this.loading = false;
          this.pie.loading = false;
          this.bar1.loading = false;
          this.bar2.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.pie.loading = false;
          this.bar1.loading = false;
          this.bar2.loading = false;
        });
    },

    //刷新饼图
    refreshPie(data) {
      this.pie.data = data;
      this.pie.settings.title = data.length;
    },

    //刷新设备状态的柱图
    refreshBar1() {
      const { warning, error, both, normal } = this.vm;

      this.bar1.maxValue = Math.max(warning, error, both, normal);
    },

    //刷新回路状态的柱图
    refreshBar2() {
      // const { tongLu, duanLu } = this.vm;
    },

    //饼图点击事件
    onPieClick() {},

    //刷新案件列表
    refreshTable() {
      this.$refs.table.refreshTable();
    },

    //配电箱点击
    onPowerBoxLoopClick(comp) {
      if (comp && comp.name) {
        this.$modal({
          placement: "center",
          component: "PowerBoxLoop",
          id: "CenterModal",
          data: {
            id: comp.name
          }
        });
      }
    }
  },

  mounted() {
    this.refreshSummary();
  }
};
</script>

<style lang="scss" scoped>
.page {
  flex-direction: column;
}

.summary-info {
  display: flex;
  height: 1.12rem;
  justify-content: space-between;
  margin-top: 0.1rem;
  .summary-info__start {
    height: 100%;
    flex: 0.31;
    border-radius: 0.06rem;
    overflow: hidden;
    .el-image {
      width: 100%;
      max-height: 100%;
    }
  }
  .summary-info__end {
    background: rgb(22, 32, 40);
    border-radius: 0.06rem;
    padding: 0.1rem;
    font-size: 0.12rem;
    height: 100%;
    flex: 0.69;
    margin-left: 0.1rem;
    overflow-y: auto;
    p {
      padding: 0;
      margin: 0 0 0.03rem 0;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .th {
      color: rgb(76, 164, 252);
      display: inline-block;
      width: 0.6rem;
      text-align: right;
      vertical-align: top;
    }

    .td {
      display: inline-block;
      width: calc(100% - 0.6rem);
      font-weight: bold;
    }
  }
}

.fixed-info {
  position: absolute;
  top: -0.34rem;
  right: 0;

  strong {
    font-size: 0.2rem;
    color: #fff;
  }
}

.pie-container {
  flex: 3;
  height: 100%;
  position: relative;
}

.bar-container1 {
  flex: 5;
  border-right: 0.01rem solid rgb(32, 103, 135);
  position: relative;
  height: 100%;
  padding-right: 0.2rem;

  .bars {
    display: flex;
    margin-top: 0.2rem;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 0.2rem);
    .bar-item {
      width: 100%;
      display: flex;
      height: 25%;
      align-items: center;
      .bar-item__label {
        width: 25%;
        vertical-align: middle;
        text-align: center;
        font-size: 0.12rem;
      }
      .bar-item__value {
        width: 70%;
      }
    }
  }
}

.bar-container2 {
  flex: 3;
  position: relative;
  height: 100%;
  .title {
    left: 0.2rem;
  }

  .bars {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0 0.1rem;
    .bar-item {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      .bar-item__label {
        height: 10%;
        font-size: 0.12rem;
      }
      .bar-item__value {
        height: 90%;
      }
    }
  }
}

.title {
  color: #fff;
  font-weight: bold;
  font-size: 0.14rem;
  position: absolute;
  left: 0;
  top: 0;
}
</style>

<style lang="scss">
.only-tablabel.el-tabs--border-card {
  background: transparent;
  border-color: rgb(29, 79, 104);
  border-width: 0.01rem;
  border-radius: 0.04rem;
  overflow: hidden;
  display: inline-block;
  max-width: 100%;
  .el-tabs__content {
    display: none;
  }

  .el-tabs__header {
    background: transparent;
    border: none;

    .el-tabs__nav-wrap.is-scrollable {
      padding: 0 0.1rem;
    }

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      line-height: 0.28rem;
      font-size: 0.12rem;
      background: rgb(37, 111, 192);
      color: #fff;
      width: 0.1rem;
      text-align: center;
    }

    .el-tabs__nav {
      .el-tabs__item {
        border-right: 0.01rem solid rgb(29, 79, 104);
        padding: 0 0.1rem !important;
        height: 0.28rem;
        line-height: 0.28rem;
        font-size: 0.12rem;
        border-color: rgb(29, 79, 104);
        color: rgb(91, 118, 127);

        &.is-active {
          color: #fff;
          background: rgb(37, 111, 192);
        }
      }
    }
  }
}
</style>