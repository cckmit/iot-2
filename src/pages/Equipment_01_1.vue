<template>
  <div class="page">
    <ColumnItem title="设备列表" superTitle smallTitle>
      <el-select
        class="fixed-selector"
        v-model="query.Peidianxiang"
        clearable
        placeholder="请选择配电箱类型"
      >
        <el-option v-for="i in PeidianxiangSelections" v-bind="i" :key="i.value"></el-option>
      </el-select>

      <FxTable
        ref="table"
        :columns="columns"
        :query.sync="query"
        :options="options"
        style="margin-top:.1rem"
      >
        <template #toolbar>
          <el-row style="width:100%;" align="middle">
            <el-col :span="8">
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
            <el-col :span="16">
              <el-form inline style="text-align:right;" @submit.native.prevent>
                <el-form-item>
                  <el-select v-model="query.Category" clearable>
                    <el-option v-for="i in CategorySelections" v-bind="i" :key="i.value"></el-option>
                  </el-select>
                </el-form-item>

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
    Category: {}
  },

  watch: {
    Category(val) {
      this.query.Category = val;
      this.refresh();
    }
  },

  data() {
    return {
      query: {
        days: 30,
        key: "",
        Category: this.Category,
        Peidianxiang: ""
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
            rows: [...rows, ...rows, ...rows, ...rows, ...rows],
            total: rows.length
          };
        }
      },

      CategorySelections: [],
      PeidianxiangSelections: []
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
            return context.value ? (
              <span class="color-4">在线</span>
            ) : (
              <span class="color-5">离线</span>
            );
          }
        },
        {
          label: "设备ID",
          prop: "Code",
          minWidth: 80,
          align: "center",
          showOverflowTooltip: false
        },

        {
          label: "所属单位",
          prop: "BusinessName",
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
          label: "所属场所",
          align: "center",
          minWidth: 130,
          showOverflowTooltip: false,
          prop: "PlaceName",
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

    viewPlaceDetail(row) {
      alert(row.PlaceName + ":" + row.PlaceId);
    }
  },

  created() {
    this.CategorySelections = [
      {
        Id: "bed445b5-158d-4d8c-ad19-2617b136ee26",
        Name: "故障电弧探测器 ",
        Value: "1",
        SortCode: 1
      },
      {
        Id: "d047dd07-b7de-4bf7-9a19-455de4ed25cc",
        Name: "电流探测器 ",
        Value: "2",
        SortCode: 2
      },
      {
        Id: "ba13d1e2-9a77-40b7-a80b-0c7d4336aef3",
        Name: "剩余电流探测器 ",
        Value: "3",
        SortCode: 3
      },
      {
        Id: "05aed15d-3967-49ec-bea4-1f0c806092e4",
        Name: "温度探测器 ",
        Value: "4",
        SortCode: 4
      },
      {
        Id: "9dc544d2-aac5-4b9e-bf77-fe429321f6ff",
        Name: "烟雾探测器",
        Value: "5",
        SortCode: 5
      },
      {
        Id: "1335953d-a2bf-4b95-82cb-7571c821cb19",
        Name: "烟感探测器",
        Value: "6",
        SortCode: 5
      },
      {
        Id: "a94134ba-f36f-4109-b17d-96126ebf12cb",
        Name: "其他 ",
        Value: "99",
        SortCode: 99
      }
    ].map(i => ({
      label: i.Name,
      value: i.Id
    }));

    this.PeidianxiangSelections = [
      {
        label: "1号配电箱",
        value: 1
      },
      {
        label: "2号配电箱",
        value: 2
      },
      {
        label: "3号配电箱",
        value: 3
      },
      {
        label: "4号配电箱",
        value: 4
      }
    ];
  }
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  height: 100%;
  position: relative;
}

.fixed-selector {
  position: absolute;
  right: 0.1rem;
  top: 0.2rem;
}
</style>