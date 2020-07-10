<template>
  <div class="map">
    <div id="Map" class="map-container"></div>
  </div>
</template>

<script>
import { MP } from "./map";
import custom_map_config from "./custom_map_config.json";

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
    initMap(BMap) {
      const { centerPoint, zoom } = this;

      this.mapInstance = new BMap.Map("Map", {
      });
      // this.mapInstance.addControl(
      //   new BMap.MapTypeControl({
      //     mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      //   })
      // );
      //切换至默认地图格式;
      // this.map.setMapType(mapType[defaultMapType]);

      this.mapInstance.setMapStyle({ styleJson: custom_map_config });

      this.mapInstance.enableScrollWheelZoom();
      this.mapInstance.centerAndZoom(
        new BMap.Point(centerPoint.split(",")[0], centerPoint.split(",")[1]),
        zoom
      );
    }
  },

  mounted() {
    this.$nextTick(() => {
      MP("GLPAZ8ATsCyB3GagF2HVqve6UnhmxGmC").then(BMap => {
        this.initMap(BMap);
      });
    });
  }
};
</script>