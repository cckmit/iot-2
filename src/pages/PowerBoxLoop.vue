<template>
  <div class="page">
    <ColumnItem title="配电箱回路" superTitle smallTitle>
      <el-select
        class="fixed-selector"
        @change="refresh"
        v-model="query.Peidianxiang"
        clearable
        placeholder="请选择配电箱"
      >
        <el-option v-for="i in PeidianxiangSelections" v-bind="i" :key="i.value"></el-option>
      </el-select>

      <div class="temperature">
        <div class="temperature-icon">
          <SvgIcon icon-class="temperature" />
        </div>
        <div class="temperature-label">
          <span>{{vm.prop1}}℃</span>
          <span>温度</span>
        </div>
      </div>

      <div class="legend">
        <div class="legend-item" v-for="i in legends" :key="i.label">
          <div class="legend-item__icon">
            <SvgIcon :icon-class="i.icon"></SvgIcon>
          </div>
          <div class="legend-item__label">{{i.label}}</div>
        </div>
      </div>
      <div class="loops" v-loading="loading">
        <Loop
          v-for="(i,index) in loops"
          :key="index"
          :code="i.code"
          :state="i.state"
          :icons="i.icons"
        />
      </div>
    </ColumnItem>
  </div>
</template>

<script>
/**
 * 页面内容：配电箱回路
 */
import Loop from "@/components/Loop.vue";
import { getLoopDetail, getPDXCategorySelections } from "@/api";

export default {
  components: {
    Loop
  },

  props: {
    id: {}
  },

  watch: {
    id(val) {
      this.query.Peidianxiang = val;
      this.refresh();
    }
  },

  data() {
    return {
      legends: [
        {
          icon: "a",
          label: "电流探测器"
        },
        {
          icon: "v",
          label: "电压探测器"
        },
        {
          icon: "lightning",
          label: "故障电弧探测器"
        },
        {
          icon: "temperature",
          label: "温度探测器"
        }
      ],

      loading: false,

      query: {
        Peidianxiang: this.id
      },

      vm: {
        prop1: 38
      },

      loops: []
    };
  },
  methods: {
    refresh() {
      this.loading = true;
      getLoopDetail()
        .then(res => {
          if (res.bl) {
            const { vm, loops } = res.data;

            this.vm = vm;

            this.loops = loops;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },

  mounted() {
    getPDXCategorySelections().then(res => {
      if (res.bl) {
        this.PeidianxiangSelections = res.data.rows.map(i => ({
          label: i.Name,
          value: i.Id
        }));
      }
    });
    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.legend {
  display: flex;
  justify-content: flex-end;
  padding: 0.1rem 0 0.3rem 0;
  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 0.2rem;
    &:last-child {
      margin-right: 0;
    }
    .legend-item__icon {
      font-size: 0.2rem;
      display: flex;
      align-items: center;
    }
    .legend-item__label {
      padding-left: 0.08rem;
    }
  }
}

.fixed-selector {
  position: absolute;
  right: 0rem;
  top: -0.3rem;
}

.temperature {
  display: flex;
  position: absolute;
  left: 1.4rem;
  top: -0.36rem;
  .temperature-icon {
    font-size: 0.26rem;
    display: flex;
    align-items: center;
  }
  .temperature-label {
    display: flex;
    flex-direction: column;
    span {
      font-size: 0.12rem;
      line-height: 1.1;
      &:first-child {
        font-size: 105%;
      }
    }
  }
}

.loops {
  height: calc(100% - 0.62rem);
  overflow-y: auto;
}
</style>