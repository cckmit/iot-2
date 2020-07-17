<template>
  <div class="building-search">
    <el-form class="building-search__searchbar" v-model="query" inline>
      <el-form-item prop="projectName">
        <el-select v-model="query.projectName" placeholder="请选择项目名称" clearable></el-select>
      </el-form-item>
      <el-form-item prop="placeName">
        <el-input v-model="query.placeName" placeholder="请输入场所名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-carousel
      ref="carousel"
      class="building-search--carousel"
      trigger="click"
      arrow="never"
      :loop="false"
      indicator-position="outside"
      :height="carouselHeight"
      :autoplay="false"
    >
      <el-carousel-item v-for="(list,index) in PlaceListGroup" :key="index">
        <div
          class="img-item"
          @click="onBuildingClick(item)"
          v-for="(item,item_index) in list"
          :key="item_index"
        >
          <el-image :src="item.img||defaultImgPath"></el-image>
          <span class="img-item__text">{{item.name}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="carousel-prev" @click="carouselControl('prev')">
      <SvgIcon icon-class="arrow-left"></SvgIcon>
    </div>
    <div class="carousel-next" @click="carouselControl('next')">
      <SvgIcon icon-class="arrow-left"></SvgIcon>
    </div>
  </div>
</template>

<script>
import { arrayGroup } from "@/util";
import defaultImgPath from "@/assets/img/default_building.jpg";

import img1 from "@/assets/demo/building_1.jpg";
import img2 from "@/assets/demo/building_2.jpg";

export default {
  data() {
    return {
      defaultImgPath,

      PlaceList: [
        { name: "职业技术学院综合楼", img: "" },
        { name: "沈河区第二中医院", img: img2 },
        { name: "金山区张堰镇敬老院", img: img1 },
        { name: "庵东镇镇政府", img: img2 },
        { name: "沈河区第二中医院", img: img1 },
        { name: "金山区张堰镇敬老院", img: img2 },
        { name: "庵东镇镇政府", img: img1 },
        { name: "沈河区第二中医院", img: "" },
        { name: "沈河区第二中医院", img: img2 },
        { name: "金山区张堰镇敬老院", img: img1 },
        { name: "庵东镇镇政府", img: img1 },
        { name: "沈河区第二中医院", img: img2 },
        { name: "金山区张堰镇敬老院", img: img1 },
        { name: "庵东镇镇政府", img: img2 },
        { name: "沈河区第二中医院", img: "" },
        { name: "沈河区第二中医院", img: img1 },
        { name: "金山区张堰镇敬老院", img: img2 },
        { name: "庵东镇镇政府", img: img2 },
        { name: "沈河区第二中医院", img: img1 },
        { name: "金山区张堰镇敬老院", img: img2 },
        { name: "庵东镇镇政府", img: img1 },
        { name: "沈河区第二中医院", img: "" }
      ],

      query: {}
    };
  },

  computed: {
    PlaceListGroup() {
      return arrayGroup(this.PlaceList, 12);
    },

    carouselHeight() {
      return this.$root.getNumberByRem("160rem") + "px";
    },

    carousel() {
      return this.$refs.carousel;
    }
  },
  methods: {
    carouselControl(cmd) {
      if (this.carousel) {
        this.carousel && this.carousel[cmd].call();
      }
    },

    onBuildingClick(item) {
      alert(item.name);
    }
  }
};
</script>

<style lang="scss">
.building-search {
  padding: 0 0.3rem;
  position: relative;

  .carousel-prev,
  .carousel-next {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    font-size: 0.4rem;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }

  .carousel-prev {
    left: -0.2rem;

    &:hover {
      transform: translate(0.05rem, -50%);
    }
  }
  .carousel-next {
    right: -0.2rem;
    .svg-icon {
      transform: rotate(180deg);
    }

    &:hover {
      transform: translate(-0.05rem, -50%);
    }
  }
}

.building-search--carousel {
  position: absolute;
  overflow-y: hidden;

  .el-carousel__indicators {
    bottom: -0.1rem;

    &.el-carousel__indicators--outside {
      position: absolute;
    }
    .el-carousel__button {
      background-color: rgba(113, 178, 255, 0.8);
    }
  }

  .img-item {
    $inner_size: 1.1rem;

    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 1.31rem;
    cursor: pointer;
    position: relative;
    padding: 0.1rem;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .el-image {
      width: $inner_size;
      height: $inner_size;
      border-radius: 0.04rem;
    }

    .img-item__text {
      width: $inner_size;
      //   height: 0.3rem;
      //   line-height: 0.3rem;
      padding-top: 0.04rem;
      font-size: 0.14rem;
      display: inline-block;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.8;
    }
  }
}

.building-search__searchbar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -0.37rem);
}
</style>