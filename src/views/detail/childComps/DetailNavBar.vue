<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="backImage">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="tittle">
        <div v-for="(item,index) in titles"
             class="tittle-item" :class="{active:index===currentIndex}"
        @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
      data(){
        return {
          titles: ['商品','参数','评论','推荐'],
          currentIndex:0
        }
      },
      components:{
        NavBar
      },
      methods:{
        backClick(){
          this.$router.back()
        },
        titleClick(index){
          this.currentIndex=index
        }
      },
    }
</script>

<style scoped>
  .backImage {
    padding-top: 6px;
  }
.tittle{
  display: flex;
  font-size: 13px;
}
  .tittle-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
