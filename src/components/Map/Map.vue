<template>
  <div class="map" v-loading="loading">
    <div id="Map" class="map-container"></div>
  </div>
</template>

<script>
import { MP } from "./map";
// import custom_map_config from "./custom_map_config.json";
import varMapPoint from "./MapPoint";
import { mapState } from "vuex";
import { getTownList, getPlaceList } from "@/api";

export default {
  name: "Map",

  props: {
    centerPoint: {
      type: String,
      default: "121.436138,29.294912"
    },
    zoom: {
      type: Number,
      default: 12
    }
  },

  data() {
    return {
      mapInstance: null,

      loading: false
    };
  },

  computed: {
    ...mapState({
      CurrentOverlayType: state => state.CurrentOverlayType
    })
  },

  watch: {
    CurrentOverlayType: {
      handler() {
        this.refresh();
      }
    }
  },

  methods: {
    initMap() {
      const { centerPoint, zoom } = this;

      this.mapInstance = new this.BMap.Map("Map", {});

      // this.mapInstance.setMapStyle({ styleJson: custom_map_config });
      this.mapInstance.setMapStyle({ style: "dark" });

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

    //初始化覆盖物
    refresh() {
      if (!this.mapInstance) return;

      this.mapInstance.clearOverlays();

      if (this.CurrentOverlayType === "PLACE") {
        this.renderPlacePoints();
      } else {
        this.renderTownPoints();
      }
    },

    //渲染街道/镇地图点
    renderTownPoints() {
      this.loading = true;
      getTownList()
        .then(res => {
          if (res.bl) {
            let point = null;
            const pointList = [];
            res.data.rows.forEach(i => {
              const { Lng, Lat, Name, Id, Status } = i;

              let _point = new this.BMap.Point(Lng, Lat);

              point = new this.MapPoint(this.mapInstance, {
                point: _point,
                onClick: meta => {
                  this.onTownPointClick(meta);
                },
                meta: {
                  type: 2,
                  color: Status,
                  text: Name,
                  Id,
                  icon: "iconfont icon-map-place-icon"
                }
              });

              pointList.push(_point);

              this.mapInstance.addOverlay(point);
            });

            //如果有地图点,则zoom到点集合的中心位置
            if (pointList && pointList.length) {
              const centerPoint = this.getCenterPoint(pointList);

              this.mapInstance.centerAndZoom(centerPoint, this.zoom);
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    //渲染场所地图点
    renderPlacePoints() {
      this.loading = true;
      getPlaceList()
        .then(res => {
          if (res.bl) {
            let point = null;
            const pointList = [];
            res.data.rows.forEach(i => {
              const { Lng, Lat, Name, Count, Id, Status } = i;

              let _point = new this.BMap.Point(Lng, Lat);

              point = new this.MapPoint(this.mapInstance, {
                point: _point,
                onClick: meta => {
                  this.onPlacePointClick(meta);
                },
                meta: {
                  type: 1,
                  color: Status,
                  name: Name,
                  text: Count,
                  Id,
                  icon: "iconfont icon-map-place-icon"
                }
              });

              pointList.push(_point);

              this.mapInstance.addOverlay(point);
            });

            //如果有地图点,则zoom到点集合的中心位置
            if (pointList && pointList.length) {
              const centerPoint = this.getCenterPoint(pointList);

              this.mapInstance.centerAndZoom(centerPoint, this.zoom);
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    //地图中街道点击
    onTownPointClick(meta) {
      const { text, Id } = meta;
      this.$modal({
        placement: "top-right",
        data: {
          title: text,
          id: Id
        },
        id: "RightModal",
        width: "4.4rem",
        component: "StreetDetail"
      });
    },

    //地图中场所点击(即项目点击)
    onPlacePointClick(meta) {
      const { name, Id } = meta;
      this.$modal({
        placement: "top-right",
        data: {
          title: name,
          id: Id
        },
        id: "RightModal",
        width: "5rem",
        component: "PlaceDetail"
      });
    },

    getCenterPoint(points) {
      if (points.length === 1) {
        return points[0];
      }

      let maxLng = Number.MIN_VALUE,
        minLng = Number.MAX_VALUE,
        maxLat = Number.MIN_VALUE,
        minLat = Number.MAX_VALUE;

      points.forEach(p => {
        if (p.lng > maxLng) {
          maxLng = p.lng;
        }

        if (p.lng < minLng) {
          minLng = p.lng;
        }

        if (p.lat > maxLat) {
          maxLat = p.lat;
        }

        if (p.lat < minLat) {
          minLat = p.lat;
        }
      });

      return new this.BMap.Point((maxLng + minLng) / 2, (maxLat + minLat) / 2);
    }
  },

  mounted() {
    this.$nextTick(() => {
      MP("GLPAZ8ATsCyB3GagF2HVqve6UnhmxGmC").then(BMap => {
        this.BMap = BMap;
        this.initMap();
        this.initClasses();
        this.refresh();
      });
    });
  }
};
</script>