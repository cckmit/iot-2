<template>
  <header class="headerbar">
    <div class="logo">
      <div class="logo-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.27 27.59">
          <path
            class="cls-1"
            d="M0,.29H5.3V7.68A1.91,1.91,0,0,0,7.2,9.59h0A1.91,1.91,0,0,0,9.11,7.68V.29h5.3V6.6c0,1.28-.12,3-2.33,3.86h0v.22h0C14,11,14.41,13,14.41,14.33V26l-2.53,1.55L9.11,26.12V13.43A1.91,1.91,0,0,0,7.2,11.52h0a1.91,1.91,0,0,0-1.9,1.91V23.92L0,20.72V14.33c0-1.29.89-3.25,2.33-3.65h0v-.22h0C.75,10,0,7.88,0,6.6Z"
          />
          <polygon class="cls-1" points="18.27 0 23.27 0 23.27 20.74 18.27 23.81 18.27 0" />
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-text--inner">物联网消防预警平台</span>
      </div>
    </div>

    <div class="switch">
      <RadioSwitch
        :options="PlaceTypeList"
        :value="CurrentOverlayType"
        @change="$store.commit('set_CurrentOverlayType',$event)"
      />
    </div>

    <div class="header-info">
      <span class="header-info--item location">
        <SvgIcon icon-class="map-place" />
        &nbsp;{{TopName||'-'}}
      </span>
      <span class="header-info--item">
        <RegionSelect
          v-model="vCurrentRegions"
          :data="RegionList"
          flatData
          nodeKey="Id"
          multiple
          :props="{ label:'Name',parent:'ParentId' }"
        />
      </span>
      <span class="header-info--item">{{CurrentTime | time('yyyy-MM-dd')}}</span>
      <span class="header-info--item">{{CurrentTime | time('hh:mm')}}</span>
      <span class="header-info--item">{{CurrentTime | week}}</span>
      <span class="header-info--item">|</span>
      <span class="header-info--item">
        <el-tooltip :content="weather.type">
          <SvgIcon :icon-class="weather.type | weatherIcon" />
        </el-tooltip>
      </span>
      <span class="header-info--item">{{weather.temperature}}℃</span>
      <span class="header-info--item">
        <el-button @click="logout" size="mini" plain type="primary">退出登录</el-button>
      </span>
    </div>
  </header>
</template>

<script>
import RadioSwitch from "@/components/RadioSwitch.vue";
import RegionSelect from "./RegionSelect/index";
import { getLocation, logout, getWeather } from "@/api";
import { mapState } from "vuex";

export default {
  components: {
    RadioSwitch,
    RegionSelect
  },

  filters: {
    weatherIcon(val) {
      return (
        {
          阴: "yin",
          小雪: "xiaoxue",
          多云转晴: "duoyunzhuanqing",
          雾天: "wutian",
          多云: "duoyun",
          大雨: "dayu",
          小雨: "xiaoyu",
          中雪: "zhongxue",
          雷阵雨: "leizhenyu",
          晴: "qing",
          雨夹雪: "yujiaxue",
          冰雹: "bingbao",
          大雪: "daxue",
          中雨: "zhongyu"
        }[val] || ""
      );
    }
  },

  computed: {
    ...mapState({
      CurrentOverlayType: state => state.CurrentOverlayType
    }),
    vCurrentRegions: {
      get() {
        return this.$store.state.CurrentRegions;
      },
      set(val) {
        this.$store.commit("set_CurrentRegions", val);
      }
    }
  },

  data() {
    return {
      PlaceTypeList: [
        {
          label: "街道/镇",
          value: "STREET"
        },
        {
          label: "场所",
          value: "PLACE"
        }
      ],

      CurrentPlaceType: 1,

      //所属区域顶级名称
      TopName: "",

      //行政区划下拉列表树(可以是扁平化数据)
      RegionList: [],

      //当前时间信息
      CurrentTime: new Date(),

      //天气信息对象
      weather: {
        type: "",
        temperature: ""
      }
    };
  },

  methods: {
    //获取位置信息
    getLocationInfo() {
      getLocation().then(res => {
        if (res.isSuccess && res.bl) {
          const {
            RegionList,
            TopName
            // Name,
            // LocationName,
            // LocationCode,
            // LocationLevel,
            // ZoomLevel
          } = res.data.rows;

          this.RegionList = RegionList;
          this.TopName = TopName;
        }
      });
    },

    //获取天气信息
    getWeather() {
      getWeather().then(res => {
        if (res.bl) {
          const { info, temperature } = res.data.result.data.realtime.weather;

          this.weather.type = info;
          this.weather.temperature = temperature;
        }
      });
    },

    //自动刷新时间
    autoUpdateCurrentTime() {
      setInterval(() => {
        this.CurrentTime = new Date();
      }, 5000);
    },

    //登出
    logout() {
      this.$confirm("是否确认登出？", { title: "提醒" }).then(() => {
        logout().then(res => {
          if (res.isSuccess && res.bl) {
            setTimeout(() => {
              location.replace("/Manage/Login");
            }, 500);
          }
        });
      });
    }
  },

  created() {
    this.getLocationInfo();

    this.getWeather();

    this.autoUpdateCurrentTime();
  }
};
</script>

<style scoped>
.cls-1 {
  fill: #fff;
}
</style>