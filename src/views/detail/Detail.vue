<template>
<div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";

  import {getDetail,Goods} from "../../network/detail";

  export default {
        name: "Detail",
      data(){
        return {
          iid:null,
          topImages:[],
          goods:{}
        }
      },
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo
      },
      methods:{

      },
      created() {
        //保存传入的iid
        this.iid=this.$route.params.iid
        //根据我们的iid请求详情数据
        getDetail(this.iid).then(res => {
          console.log(res.result);
          const data=res.result;
          //获取顶部的图片轮播数据
          this.topImages=data.itemInfo.topImages;
          //获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        })
      }
    }
</script>

<style scoped>

</style>
