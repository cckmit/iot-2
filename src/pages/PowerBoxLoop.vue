<template>
  <div class="page">
    <ColumnItem title="配电箱回路" superTitle smallTitle>
      <el-select class="fixed-selector" v-model="query.Peidianxiang" clearable placeholder="请选择配电箱">
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
      <div class="loops">
        <Loop v-for="i in loops" :key="i.code" :code="i.code" :state="i.state" :icons="i.icons" />
      </div>
    </ColumnItem>
  </div>
</template>

<script>
/**
 * 页面内容：配电箱回路
 */
import Loop from "@/components/Loop.vue";
import { getRandomValueFromArray } from "@/util";

function getRandomLoops(n = 30) {
  const arr = [];

  for (let i = 0; i < n; i++) {
    let item = {
      code: i + 1,
      state: getRandomValueFromArray(["on", "off"]),
      icons: (function() {
        let length = getRandomValueFromArray([1, 2, 3, 4]);

        let arr = [];

        for (let i = 0; i < length; i++) {
          let icon = getRandomValueFromArray(["A", "B", "C", "D"]);

          if (arr.indexOf(icon) < 0) {
            arr.push(icon);
          }
        }

        return arr.sort();
      })()
    };

    arr.push(item);
  }

  return arr;
}

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

      query: {
        Peidianxiang: this.id
      },

      PeidianxiangSelections: [
        { label: "1号配电箱", value: "1号配电箱" },
        { label: "2号配电箱", value: "2号配电箱" },
        { label: "3号配电箱", value: "3号配电箱" }
      ],

      vm: {
        prop1: 38
      },

      loops: []
    };
  },
  methods: {
    refresh() {
      this.loops = getRandomLoops(32);
    }
  },

  mounted() {
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