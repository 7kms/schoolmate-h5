<style lang="less" module>
    @import '../../assets/less/const.less';
    .header{
        height: 140px;
        padding-top: 24px;
        color: #fff;
        background-image: linear-gradient(-180deg, #56AEEA 0%, #81D2F8 98%);
    }
    .pic{
        width: 60px;
        height: 60px;
        margin: 0 auto 15px;
    }
    .nav{
        display: flex;
        height: 30px;
        line-height: 30px;
        background-color: #fff;
        .navItem{
            flex: 1;
        }
        .active{
            color: @theme-color;
        }
    }
    .detail{
        margin-top: 6px;
    }
</style>
<template>
    <div class="content">
        <div class="top">
            <div :class="$style.header">
                <div :class="$style.pic">
                    <img :src="testUrl" alt="" width="60" height="60">
                </div>
                <div class="size-topic text-center">野兽骑行</div>
            </div>
            <div :class="[$style.nav,'size-topic','text-center']">
                <span :class="[$style.navItem,{[$style.active]:item=='basic'}]" @click="switchItem('basic')">简介</span>
                <span :class="[$style.navItem,{[$style.active]:item=='activity'}]" @click="switchItem('activity')">活动</span>
                <span :class="[$style.navItem,{[$style.active]:item=='photo'}]" @click="switchItem('photo')">照片</span>
                <span :class="[$style.navItem,{[$style.active]:item=='interact'}]" @click="switchItem('interact')">互助</span>
            </div>
        </div>
        <div :class="$style.detail">
            <Basic :dataInfo="basicInfo" v-if="item=='basic'"></Basic>
            <Activity :dataInfo="{}" v-if="item=='activity'"></Activity>
            <Photo :dataInfo="{}" v-if="item=='photo'"></Photo>
            <Interact :dataInfo="{}" v-if="item=='interact'"></Interact>
        </div>
    </div>
</template>
<script>
  import $api from 'api';
  import {serverUrl} from '../../config'
  import Basic from './basic.vue'
  import Activity from './activity.vue'
  import Photo from './photo.vue'
  import Interact from './interact.vue'
  export default {
    components:{
      Basic,
      Activity,
      Photo,
      Interact
    },
    data(){
      return {
        item: '',
        testUrl:require('../../assets/moke/0.3.1.png'),
        basicInfo:{

        }
      }
    },
    methods:{
      getData(item){
        if(item == 'basic'){
          $api.get('/index.php/Circle/getCircle',{cid: this.$route.params.id})
            .then(res=>{
                if(res.code == 200){
                  Object.assign(this.basicInfo,res.data);
                }
            },res=>{

            })
        }


      },
      switchItem(item){
        var id = this.$route.params.id;
        this.$router.replace({path:`/moments/interest/${id}`,query:{item}})
      }
    },
    created(){
      var id = this.$route.params.id;
      var item = this.$route.query.item;
      this.item = item;
      console.log(id,item);
      this.getData(this.item);
    },
    watch:{
      $route(to,from){
        this.item = this.$route.query.item;
        this.getData(this.item);
      }
    }
  }
</script>