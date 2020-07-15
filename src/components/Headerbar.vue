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
      <RadioSwitch :options="PlaceTypeList" v-model="CurrentPlaceType" />
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
        <SvgIcon icon-class="qing" />
      </span>
      <span class="header-info--item">20℃</span>
      <span class="header-info--item">
        <el-button @click="logout" size="mini" plain type="primary">退出登录</el-button>
      </span>
    </div>
  </header>
</template>

<script>
import RadioSwitch from "@/components/RadioSwitch.vue";
import RegionSelect from "./RegionSelect/index";
import { getLocation, logout } from "@/api";

export default {
  components: {
    RadioSwitch,
    RegionSelect
  },

  computed: {
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
          value: 1
        },
        {
          label: "场所",
          value: 2
        }
      ],

      CurrentPlaceType: 1,

      //行政区划下拉列表树(可以是扁平化数据)
      RegionList: [],

      //当前时间信息
      CurrentTime: new Date()
    };
  },

  methods: {
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

    autoUpdateCurrentTime() {
      setInterval(() => {
        this.CurrentTime = new Date();
      }, 5000);
    },

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

    this.autoUpdateCurrentTime();
  }
};
</script>

<style scoped>
.cls-1 {
  fill: #fff;
}
</style>