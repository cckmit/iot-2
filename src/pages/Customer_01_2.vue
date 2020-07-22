<template>
  <div class="page">
    <ColumnItem title="单位预警情况" superTitle smallTitle>
      <FxTable ref="table" :columns="columns" :query.sync="query" :options="options">
        <template #toolbar>
          <el-row style="width:100%;" align="middle">
            <el-col :span="16">
              <el-form inline @submit.native.prevent>
                <el-form-item>
                  <el-radio-group v-model="query.days" @change="refresh">
                    <el-radio-button :label="30">近30天</el-radio-button>
                    <el-radio-button :label="60">近60天</el-radio-button>
                    <el-radio-button :label="90">近90天</el-radio-button>
                    <el-radio-button :label="120">近120天</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-radio-group v-model="query.Category" @change="refresh">
                    <el-radio-button label>全部</el-radio-button>
                    <el-radio-button label="1">报警</el-radio-button>
                    <el-radio-button label="2">故障</el-radio-button>
                    <el-radio-button label="3">报警且故障</el-radio-button>
                    <el-radio-button label="4">正常</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form inline style="text-align:right;" @submit.native.prevent>
                <el-form-item>
                  <el-input
                    style="width:1.8rem;"
                    v-model="query.key"
                    clearable
                    placeholder="请输入场所内容"
                    @keyup.native.enter="refresh"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="refresh">搜索</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </template>
      </FxTable>
    </ColumnItem>
  </div>
</template>

<script>
/**
 * 页面内容：单位预警情况
 */
export default {
  props: {
    category: {},
    days: {}
  },

  watch: {
    days(val) {
      this.query.days = val;
      this.refresh();
    },
    category(val) {
      this.query.Category = val;
      this.refresh();
    }
  },

  data() {
    return {
      query: {
        Category: this.category,
        days: this.days
      },

      options: {
        api: "/api/govShow?optionType=businesslist",
        background: "transparent",
        border: false,
        outBorder: false,
        highlightCurrentRow: false,
        paginationProps: {
          height: "0.5rem"
        },
        toolbarProps: {
          height: "0.5rem"
        },
        pagerLayout: "prev,pager,next"
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
          minWidth: 70,
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
          minWidth: 110,
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
          minWidth: 120,
          prop: "Tel"
        },
        {
          label: "接入时间",
          align: "center",
          minWidth: 95,
          prop: "AccessTime",
          render: (h, context) => (
            <span>{new Date(context.value).format("yyyy-MM-dd")}</span>
          )
        },
        {
          label: "场所数",
          align: "center",
          minWidth: 70,
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
          minWidth: 70,
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
    refresh() {
      this.$message("刷新");

      this.$refs.table.refreshTable();
    },

    zoomPlaceInMap(row) {
      alert(`通过\nId:[${row.Id}]\n查找出placeList的地图点数组，然后zoom过去`);
    }
  }
};
</script>