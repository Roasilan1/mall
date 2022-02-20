<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carouselItem in list"
        :key="carouselItem.id"
      >
        <img v-lazy="carouselItem.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css"
export default {
    name:"Carousel",
    props:["list"],
    watch:{
        list:{
            immediate:true,
            handler(){
                this.$nextTick(function(){
                        let mySwiper = new Swiper('.swiper-container', {
                        autoplay: true,//可选选项，自动滑动
                        loop: true, // 循环模式选项
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable :true,
                        },
                    })
                })
            }
        }
    }
    

};
</script>

<style>
</style>