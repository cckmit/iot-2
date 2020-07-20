<template>
  <div class="page">
    <ColumnItem title="行业详情" superTitle smallTitle>
      <!--  搜索条件 -->
      <el-form :model="query" inline style="overflow:hidden;transform:translate(0,-.25rem);">
        <el-form-item prop="days" style="float:right;margin-bottom:0;">
          <el-radio-group v-model="query.days" @change="refresh">
            <el-radio-button :label="30">近30天</el-radio-button>
            <el-radio-button :label="60">近60天</el-radio-button>
            <el-radio-button :label="90">近90天</el-radio-button>
            <el-radio-button :label="120">近120天</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <!-- 简要信息 -->
      <div class="summary-info" style="transform:translate(0,-.2rem);">
        <div class="summary-item" v-for="i in summaryItems" :key="i.prop" :style="'width:'+i.width">
          <div class="summary-item__start">
            <SvgIcon :icon-class="i.icon"></SvgIcon>
          </div>
          <div class="summary-item__end">
            <div class="summary-item__name">{{i.name}}</div>
            <div class="summary-item__value">
              <span v-if="i.type==1">{{vm[i.prop]}}</span>
              <template v-else>
                <span style="color:rgb(63,201,145)">{{vm[i.prop]}}</span>/
                <span>{{vm[i.prop2]}}</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 列表信息 -->
      <div class="table-container" style="height:calc(100% - 1rem)">
        <FxTable ref="table" :columns="columns" :options="options" :query.sync="query"></FxTable>
      </div>
    </ColumnItem>
  </div>
</template>

<script>
export default {
  props: {
    SId: {}
  },

  data() {
    const _this = this;
    return {
      query: {
        days: 30
      },

      vm: {},

      summaryItems: [
        {
          name: "行业名称",
          prop: "prop1",
          icon: "toolbox-circle",
          type: 1,
          width: "20%"
        },
        {
          name: "场所数量",
          prop: "prop2",
          icon: "map-circle",
          width: "20%",
          type: 1
        },
        {
          name: "已处理/报警总数",
          prop: "prop3",
          prop2: "prop4",
          icon: "light-circle",
          type: 2
        },
        {
          name: "已处理/故障总数",
          prop: "prop5",
          prop2: "prop6",
          icon: "tool-circle",
          type: 2
        }
      ],

      options: {
        api: "/api/Business",
        background: "transparent",
        border: false,
        outBorder: false,
        highlightCurrentRow: false,
        paginationProps: {
          height: "0.5rem"
        },
        toolbar: false,
        toolbarProps: {
          height: "0.5rem"
        },
        pagerLayout: "prev,pager,next",

        resHandler() {
          const rows = [
            {
              Id: "056e9cdf-1843-4573-9dda-0e7b0af30de1",
              Name: "金山区佰仁养护院",
              Tel: "18602141366",
              Contact: "黄越石",
              AccessTime: "2019-08-20T10:08:56.86",
              PlaceCount: 1,
              EquipmentCount: 256,
              WarningCount: 1,
              WarningOKCount: 0,
              ErrorCount: 8,
              ErrorOKCount: 8,
              Category: 3
            },
            {
              Id: "72af77bd-8729-4fac-879c-df5da9fa0316",
              Name: "金山区吕巷镇敬老院",
              Tel: "13764895912",
              Contact: "韩爱华",
              AccessTime: "2019-07-26T10:19:29.157",
              PlaceCount: 1,
              EquipmentCount: 200,
              WarningCount: 1,
              WarningOKCount: 1,
              ErrorCount: 10,
              ErrorOKCount: 9,
              Category: 2
            }
          ];

          const vm = {
            prop1: "其它",
            prop2: 10,
            prop3: "17",
            prop4: "251",
            prop5: "171",
            prop6: "259"
          };

          _this.refreshSummaryInfo(vm);

          return {
            rows,
            total: rows.length
          };
        }
      }
    };
  },

  computed: {
    columns() {
      const _this = this;
      return [
        {
          label: "状态",
          align: "center",
          minWidth: 100,
          showOverflowTooltip: false,
          prop: "Category",
          render: (h, context) => {
            const obj = {
              1: {
                txt: "报警",
                class: "color-1"
              },
              2: {
                txt: "故障",
                class: "color-2"
              },
              3: {
                txt: "报警且故障",
                class: "color-3"
              }
            }[context.value];
            return <span class={obj.class}>{obj.txt}</span>;
          }
        },
        {
          label: "单位名称",
          prop: "Name",
          minWidth: 130,
          align: "center",
          resizable: true,
          showOverflowTooltip: false
        },

        {
          label: "联系人",
          align: "center",
          minWidth: 80,
          prop: "Contact"
        },
        {
          label: "联系电话",
          align: "center",
          minWidth: 130,
          prop: "Tel"
        },
        {
          label: "接入时间",
          align: "center",
          minWidth: 100,
          prop: "AccessTime",
          render: (h, context) => (
            <span>{new Date(context.value).format("yyyy-MM-dd")}</span>
          )
        },
        {
          label: "场所数",
          align: "center",
          minWidth: 80,
          showOverflowTooltip: false,
          prop: "PlaceCount",
          render(h, context) {
            const { value, row } = context;
            return (
              <a
                class="link"
                on-click={() => {
                  _this.zoomPlaceInMap(row);
                }}
              >
                {value || "-"}个
              </a>
            );
          }
        },
        {
          label: "设备数",
          align: "center",
          minWidth: 80,
          prop: "EquipmentCount"
        },
        {
          label: "报警数",
          align: "center",
          minWidth: 80,
          prop: "WarningCount",
          render: (h, context) => {
            const { row, value } = context;
            return (
              <span>
                <span class="color-1">{row.WarningOKCount}</span>/
                <span>{value}</span>
              </span>
            );
          }
        },
        {
          label: "故障数",
          align: "center",
          minWidth: 100,
          prop: "ErrorCount",
          render: (h, context) => {
            const { row, value } = context;
            return (
              <span>
                <span class="color-2">{row.ErrorOKCount}</span>/
                <span>{value}</span>
              </span>
            );
          }
        }
      ];
    }
  },

  methods: {
    refreshSummaryInfo(vm) {
      this.vm = vm;
    },

    refresh() {
      this.$refs.table.refreshTable();
    },

    zoomPlaceInMap(row) {
      alert(`通过\nId:[${row.Id}]\n查找出placeList的地图点数组，然后zoom过去`);
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100%;
  position: relative;
}

.summary-info {
  display: flex;
  background: rgb(22, 27, 33);
  border-radius: 0.06rem;
  padding: 0.15rem 0.1rem;

  .summary-item {
    flex: auto;
    display: flex;
    align-items: center;
    border-right: 0.01rem solid rgb(50, 83, 99);
    padding: 0 0.2rem;

    &:last-child {
      border-right: none;
    }
    .summary-item__start {
      width: 34%;
      font-size: 0.34rem;
      text-align: center;
      display: flex;
      align-items: center;
    }
    .summary-item__end {
      display: flex;
      flex-direction: column;
      .summary-item__name {
        color: rgb(76, 164, 252);
        font-size: 0.14rem;
      }
      .summary-item__value {
        font-weight: bold;
        font-size: 0.16rem;
      }
    }
  }
}
</style>