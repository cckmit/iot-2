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
                  <el-select v-model="query.Category" clearable placeholder="请选择设备类型">
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
import {
  getEquipmentCategorySelections,
  getPDXCategorySelections
} from "@/api";

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
        api: "/api/govShow?optionType=equipmentlist",
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
          minWidth: 70,
          align: "center",
          showOverflowTooltip: false
        },

        {
          label: "所属单位",
          prop: "BusinessName",
          minWidth: 120,
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
    getEquipmentCategorySelections().then(res => {
      if (res.bl) {
        this.CategorySelections = res.data.rows.map(i => ({
          label: i.Name,
          value: i.Id
        }));
      }
    });

    getPDXCategorySelections().then(res => {
      if (res.bl) {
        this.PeidianxiangSelections = res.data.rows.map(i => ({
          label: i.Name,
          value: i.Id
        }));
      }
    });
  }
};
</script>

<style scoped lang="scss">
.fixed-selector {
  position: absolute;
  right: 0.1rem;
  top: -0.3rem;
}
</style>