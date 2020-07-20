import './map-point.scss';
import $ from 'jquery';

export default function varMapPoint(BMap) {
    var MapPoint = function (map, option) {
        this._map = map;
        this.$div = null;
        this._onClick = option.onClick;
        this._point = option.point;
        this._meta = option.meta;
    };

    MapPoint.prototype = new BMap.Overlay();

    MapPoint.prototype.initialize = function () {
        var _this = this;

        const { color, type, icon, text } = this._meta;

        this.$div = $(
            `<div class="map-point type${type} color${color}">
                    <div class="map-point__text">${text || 0}</div>
                    <div class="map-point__icon ${icon}"></div>
                </div>`
        );
        if (this._onClick && typeof this._onClick === "function") {
            this.$div.bind("click", function () {
                _this._onClick(_this._meta);
            });
        }
        var _div = this.$div.get(0);
        this._map.getPanes().labelPane.appendChild(_div);
        return _div;
    };

    MapPoint.prototype.draw = function () {
        var point = this._map.pointToOverlayPixel(this._point);

        this.$div.css({
            left: point.x,
            top: point.y
        });
    };

    MapPoint.prototype.getPoint = function () {
        return this._point;
    };

    this.MapPoint = MapPoint;
}