<template>
<!--  所有的item都展示同一个图片同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
    <div v-if="!isActive">
      <slot  name="item-icon"></slot>
    </div>
   <div v-else>
     <slot  name="item-icon-active"></slot>
   </div>
<!--    //插槽外套一层div可以使动态绑定的class属性继承下来，因为插槽会被替换掉-->
    <div  :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
<!--    <div>首页</div>-->
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'#ff5777'
        }
      },
      data(){
          return {
            //isActive:false
          }
      },
      computed:{
          isActive(){
            let paths=this.$route.path.indexOf(this.path)
            console.log(paths);
            return paths!==-1
          },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
      },
      methods:{
          itemClick(){
            //console.log('itemClick');
            this.$router.replace(this.path).catch(err=>err)
          }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 7px;
    /*图片最下方就多3个px，此方法用来去掉*/
    vertical-align:middle;
    margin-bottom: 2px;
  }
  /*.active{*/
  /*  color: #ff5777;*/
  /*}*/
</style>
