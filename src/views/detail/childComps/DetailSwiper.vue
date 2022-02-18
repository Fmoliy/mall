<template>
    <swiper>
      <swiper-item v-for="item in topImages" class="swiper-item">
        <a >
          <img :src="item" alt="" >
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
    export default {
        name: "DetailSwiper",
      props: {
          topImages: {
            type: Array,
            default() {
              return []
            }
          }
      },
        components: {
          Swiper,
          SwiperItem
        }

      }
</script>

<style scoped>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>
