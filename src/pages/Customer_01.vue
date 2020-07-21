<template>
  <div class="page">
    <div class="chart">
      <ChartPie
        :data="chartData"
        :loading="loading"
        :settings="chartSettings"
        :on-click="onPieClick"
      />
    </div>
    <div class="table" v-loading="loading">
      <el-table
        :data="tableData"
        row-class-name="row-hover--bg"
        :cell-class-name="cellClassName"
        @row-click="onRowClick"
      >
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
/**
 * 页面内容：单位运行情况
 */
import { getCustomerOperation } from "@/api";
import ChartPie from "@/components/Chart/ChartPie.vue";
import { colorMap } from "@/plugins/echarts";

export default {
  components: {
    ChartPie
  },

  data() {
    return {
      pie: null,

      vm: {},

      chartData: [],

      chartSettings: {
        metrics: "value",
        dimension: "name",
        title: "0",
        unit: "个",
        subtitle: "接入总数",
        titlePosition: {
          left: "36%",
          top: "35%"
        },
        radius: ["53%", "70%"],
        center: ["38%", "50%"],
        legendShow: false,
        titleShow: true
      },

      tableData: [],

      query: {
        days: 30
      },

      loading: false
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
        {
          name: "正常",
          category: 4,
          value: normal || 0,
          color: colorMap.normal
        },
        {
          name: "仅报警",
          category: 1,
          value: warning || 0,
          color: colorMap.warning
        },
        {
          name: "仅故障",
          category: 2,
          value: error || 0,
          color: colorMap.error
        },
        {
          name: "报警且故障",
          category: 3,
          value: both || 0,
          color: colorMap.both
        }
      ];

      this.chartSettings.title = total;
      this.chartData = data;
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
          category: 1,
          count: warning,
          progress: !warningAll ? 0 : warningHandled / warningAll,
          all: warningAll,
          handled: warningHandled
        },
        {
          status: "仅故障",
          category: 2,
          count: error,
          progress: !errorAll ? 0 : errorHandled / errorAll,
          all: errorAll,
          handled: errorHandled
        },
        {
          status: "报警且故障",
          category: 3,
          count: both,
          progress: !bothAll ? 0 : bothHandled / bothAll,
          all: bothAll,
          handled: bothHandled
        }
      ];

      this.tableData = rows;
    },

    onRowClick(row) {
      this.$modal({
        placement: "center",
        data: { days: this.query.days, category: row.category },
        id: "CenterModal",
        component: "Customer_01_1"
      });
    },

    onPieClick(e) {
      const { category } = e.data;
      this.$modal({
        placement: "center",
        data: { days: this.query.days, category },
        id: "CenterModal",
        component: "Customer_01_2"
      });
    }
  },

  mounted() {
    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.chart {
  height: 100%;
  // width: 25%;
  flex: 25%;
  position: relative;
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
  top: -0.3rem;
  right: 0;
}
</style>