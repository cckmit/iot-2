<template>
  <div class="map">
    <div id="Map" class="map-container"></div>
  </div>
</template>

<script>
import { MP } from "./map";
import custom_map_config from "./custom_map_config.json";
import varMapPoint from "./MapPoint";

export default {
  name: "Map",

  props: {
    centerPoint: {
      type: String,
      default: "121.436138,29.294912"
    },
    zoom: {
      type: Number,
      default: 16
    }
  },

  data() {
    return {
      mapInstance: null
    };
  },

  methods: {
    initMap() {
      const { centerPoint, zoom } = this;

      this.mapInstance = new this.BMap.Map("Map", {});

      this.mapInstance.setMapStyle({ styleJson: custom_map_config });

      this.mapInstance.enableScrollWheelZoom();
      this.mapInstance.centerAndZoom(
        new this.BMap.Point(
          centerPoint.split(",")[0],
          centerPoint.split(",")[1]
        ),
        zoom
      );
    },

    initClasses() {
      varMapPoint.call(this, this.BMap);
    },

    initData() {
      const point1 = new this.MapPoint(this.mapInstance, {
        point: new this.BMap.Point(121.436138, 29.294912),
        onClick: function() {
          alert(1);
        },
        dataObj: {
          type: 2,
          color: 1,
          text: "松北街道",
          icon: "iconfont icon-map-place-icon"
        }
      });

      const point2 = new this.MapPoint(this.mapInstance, {
        point: new this.BMap.Point(121.434, 29.295912),
        onClick: function() {},
        dataObj: {
          type: 1,
          color: 2,
          text: 55,
          icon: "iconfont icon-map-place-icon"
        }
      });

      const point3 = new this.MapPoint(this.mapInstance, {
        point: new this.BMap.Point(121.435, 29.295912),
        onClick: function() {},
        dataObj: {
          type: 1,
          color: 3,
          text: 85,
          icon: "iconfont icon-map-place-icon"
        }
      });

      const point4 = new this.MapPoint(this.mapInstance, {
        point: new this.BMap.Point(121.433, 29.297912),
        onClick: function() {},
        dataObj: {
          type: 1,
          color: 4,
          text: 54,
          icon: "iconfont icon-map-place-icon"
        }
      });
      this.mapInstance.addOverlay(point1);
      this.mapInstance.addOverlay(point2);
      this.mapInstance.addOverlay(point3);
      this.mapInstance.addOverlay(point4);
    }
  },

  mounted() {
    this.$nextTick(() => {
      MP("GLPAZ8ATsCyB3GagF2HVqve6UnhmxGmC").then(BMap => {
        this.BMap = BMap;
        this.initMap();
        this.initClasses();
        this.initData();
      });
    });
  }
};
</script>