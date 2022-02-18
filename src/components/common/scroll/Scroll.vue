<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: 0
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted() {
      //1.创建BSsroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        //click属性为true才可以监听div
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })

      //2.监听滚动区域
      this.scroll.on('scroll',(position)=>{
        //console.log(position);
        this.$emit('scroll',position)
      })

      //console.log(this.scroll);

      //this.scroll.refresh()

      //3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=1000){
          this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
         this.scroll && this.scroll.refresh()
        //console.log('----');
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
