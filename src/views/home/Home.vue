<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav">
            <div slot="center">
                购物街
            </div>
        </nav-bar>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isTabFixed"
      ></tab-control>
      <scroll class="content" ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore"
      >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
<!--      监听组件的原生事件时需要加这个修饰符.native，才可以进行监听-->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";

  export default {
        name: "Home",
        data(){
          return {
              banners:[],
              recommends: [],
              goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
              },
              currentType:'pop',
              isShowBackTop:false,
              tabOffsetTop:0,
              isTabFixed:false,
              saveY:0
          }
        },
      activated() {
        //console.log('active');
        this.$refs.scroll.scrollTo(0,this.saveY,1)
        this.$refs.scroll.refresh()
      },
      deactivated() {
          this.saveY=this.$refs.scroll.getScrollY()
        //console.log(this.saveY);
      },
    computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
        components:{
          HomeSwiper,
          RecommendView,
          FeatureView,
          NavBar,
          TabControl,
          GoodsList,
          Scroll,
          BackTop
        },
        created() {
          //1.请求多个数据
           this.getHomeMultidata(),
          //2.请求商品信息
           this.getHomeGoods('pop'),
           this.getHomeGoods('new'),
           this.getHomeGoods('sell')
        },
      mounted() {
          const refresh=debounce(this.$refs.scroll.refresh,200)
          //this.debounce()
        //3.监听item中图片加载完成
        this.$bus.$on('itemImageLoad',()=>{
          refresh()
          //console.log('----');
        })
        //所有的组件都有一个属性$el:用于获取组件中的元素

        //this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
      },
      methods:{
        swiperImageLoad(){
          console.log(this.$refs.tabControl2.$el.offsetTop);
          this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
        },
        tabClick(index){
          switch (index) {
            case 0:
              this.currentType='pop'
              break
            case 1:
              this.currentType='new'
              break
            case 2:
              this.currentType='sell'
              break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;

            //console.log(index);
          },
        backClick(){
          //console.log('qqqq');
          //ref
          this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
          //console.log(position);
          //position.y >1000
          this.isShowBackTop = -position.y > 1000
          this.isTabFixed = (-position.y)>this.tabOffsetTop

        },
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
          // 网络请求相关
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
              //console.log(res.data.recommend.list);
              this.banners=res.data.banner.list;
              this.recommends=res.data.recommend.list
            })
          },
        getHomeGoods(type){
          const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res=>{
            //console.log(res);
            //push(...)特殊语法
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1
            //完成了下拉加载更多
            this.$refs.scroll.finishPullUp()
          })
        },
      }
    }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: white;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top:0;*/
  /*z-index: 9;*/

}
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    background: white;
    position: relative;
    z-index: 9;
  }
  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/

  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
