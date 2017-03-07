<style lang="less" module>
    @import '../../assets/less/const.less';
    .item{
        margin-bottom: 6px;
    }
    .bar{
        position: relative;
        height: 30px;
        line-height: 30px;
        padding-left: 23.5px;
        background-color: @body-color;
        &::before{
             content: '';
             position: absolute;
             width: 2.5px;
             height: 16px;
             left: 16px;
             top: 50%;
             margin-top: -8px;
             background-color:  @theme-color;
         }
    }

</style>
<template>
    <div>
       <!-- <div :class="[$style.bar,'size-topic','color-theme']">
            <span>我的行业圈</span>
        </div>
        <IndustryItem :dataInfo="{}"></IndustryItem>
        <div :class="[$style.bar,'size-topic','color-theme']">
            <span>我的兴趣圈</span>
        </div>-->
        <ul>
            <Item v-for="(item,index) in list" :class="$style.item" :key="index" :dataInfo="item" @click.native="goEdit(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/interest.vue';
  import $api from 'api';
  export default {
    data(){
      return {
          list:[],
        loading: false
      }
    },
    components:{
      Item
    },
    methods:{
      goEdit(item){
          this.$router.push(`/publish/interest?cid=${item.cid}`);
      }
    },
    created(){
        $api.get('/index.php/Circle/getMyCircle')
        .then(data => {
            data.forEach(item =>{
                if(!item.pictures)item.pictures=[];
                this.list.push(item);
            })
        },res=>{
            this.$toast('服务器异常');
        })
    }
  }
</script>
