<template>
  <div class="page">
    <ColumnItem title="案件列表" superTitle smallTitle>
      <FxTable ref="table" :columns="columns" :query.sync="query" :options="options">
        <template #toolbar>
          <el-row style="width:100%;" align="middle">
            <el-col :span="16">
              <el-form inline @submit.native.prevent>
                <el-form-item>
                  <el-radio-group v-model="vDays" @change="refresh">
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
                    placeholder="请输入场所内容"
                    clearable
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
 * 页面内容：案件列表
 */
export default {
  props: {
    category: {},
    days: {}
  },

  watch: {
    days(val) {
      this.vDays = val;
      this.refresh();
    },
    category(val) {
      this.query.Category = val;
      this.refresh();
    }
  },

  data() {
    return {
      vDays: this.days,

      query: {
        Category: this.category
      },

      options: {
        api: "/api/Business",
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
        pagerLayout: "prev,pager,next",

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
          label: "设备ID",
          prop: "ID",
          minWidth: 70,
          align: "center",
          showOverflowTooltip: false
        },
        {
          label: "设备类型",
          align: "center",
          minWidth: 80,
          showOverflowTooltip: false,
          resizable: true,
          prop: "type"
        },
        {
          label: "所属企业",
          prop: "company",
          minWidth: 105,
          align: "center",
          resizable: true,
          showOverflowTooltip: false
        },
        {
          label: "所属场所",
          align: "center",
          minWidth: 105,
          showOverflowTooltip: false,
          prop: "place",
          render(h, context) {
            const { value, row } = context;
            return (
              <a
                class="link"
                on-click={() => {
                  _this.viewPlaceDetail(row);
                }}
              >
                {value}
              </a>
            );
          }
        },
        {
          label: "联系人",
          align: "center",
          minWidth: 70,
          prop: "contact"
        },
        {
          label: "联系电话",
          align: "center",
          minWidth: 110,
          prop: "tel"
        },
        {
          label: "发生时间",
          align: "center",
          minWidth: 95,
          prop: "time"
        },
        {
          label: "状态",
          align: "center",
          minWidth: 70,
          showOverflowTooltip: false,
          prop: "status",
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
          label: "处理状态",
          align: "center",
          minWidth: 90,
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
      ];
    }
  },

  methods: {
    refresh() {
      this.$message("刷新");

      this.$refs.table.refreshTable();
    },

    viewPlaceDetail(row) {
      alert(row.place);
    }
  }
};
</script>