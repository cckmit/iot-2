<template>
  <div class="page">
    <ColumnItem title="设备列表" superTitle smallTitle>
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
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form inline style="text-align:right;" @submit.native.prevent>
                <el-form-item>
                  <el-input
                    v-model="query.key"
                    clearable
                    placeholder="请输入设备ID/所属单位"
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
 * 页面内容：设备列表
 */
export default {
  props: {
    category: {}
  },

  watch: {
    category(val) {
      this.query.Category = val;
      this.refresh();
    }
  },

  data() {
    return {
      query: {
        days: 30,
        key: "",
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
              Id: "ce0da6a9-c647-42a5-97bb-008fbd0b6cc4",
              Code: "1",
              BusinessName: "金山区山阳镇敬老院",
              Contact: "吴华军",
              Tel: "13818639065",
              PlaceId: "a07d3221-71df-4dba-9e2c-19178f8584af",
              PlaceName: "山阳镇敬老院",
              IsOnline: true,
              WarningCount: 0,
              WarningOKCount: 0,
              ErrorCount: 0,
              ErrorOKCount: 0
            },
            {
              Id: "620784fd-9c08-417b-8bad-02a983b9fd6f",
              Code: "1",
              BusinessName: "金山区新农普度养老院",
              Contact: "颜力",
              Tel: "15821870633",
              PlaceId: "4f4881d7-c18f-4d51-9494-5a8a3010958a",
              PlaceName: "金山区新农普度养老院",
              IsOnline: true,
              WarningCount: 0,
              WarningOKCount: 0,
              ErrorCount: 0,
              ErrorOKCount: 0
            },
            {
              Id: "d74b52e1-ec97-4b3a-9662-02b4f8595325",
              Code: "1",
              BusinessName: "金山卫镇敬老院",
              Contact: "陆院长",
              Tel: "13816757108",
              PlaceId: "2626406d-9a1f-40e3-8a9f-1ecb9ae6fd2e",
              PlaceName: "金山卫镇敬老院",
              IsOnline: true,
              WarningCount: 0,
              WarningOKCount: 0,
              ErrorCount: 0,
              ErrorOKCount: 0
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
          label: "在线状态",
          align: "center",
          minWidth: 80,
          prop: "IsOnline",
          render: (h, context) => {
            return (
              context.value?<span class="color-4">在线</span>
              :<span class="color-5">离线</span>
            );
          }
        },
        {
          label: "设备ID",
          prop: "ID",
          minWidth: 80,
          align: "center",
          showOverflowTooltip: false
        },

        {
          label: "所属单位",
          prop: "company",
          minWidth: 130,
          align: "center",
          resizable: true,
          showOverflowTooltip: false
        },
        {
          label: "所属场所",
          align: "center",
          minWidth: 130,
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
          minWidth: 80,
          prop: "contact"
        },
        {
          label: "联系电话",
          align: "center",
          minWidth: 130,
          prop: "tel"
        },
        {
          label: "发生时间",
          align: "center",
          minWidth: 120,
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

<style scoped lang="scss">
.page {
  display: flex;
  height: 100%;
  position: relative;
}
</style>