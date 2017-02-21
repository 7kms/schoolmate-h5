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
        <div :class="[$style.bar,'size-topic','color-theme']">
            <span>我的行业圈</span>
        </div>
        <IndustryItem :dataInfo="{}"></IndustryItem>
        <div :class="[$style.bar,'size-topic','color-theme']">
            <span>我的兴趣圈</span>
        </div>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-distance="80">
            <InterestItem v-for="(item,index) in industry.list" :class="$style.item" :key="index" :dataInfo="item" @click="goInterest(item)"></InterestItem>
        </ul>
        <Loading v-if="loading"></Loading>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import IndustryItem from '../public/industry.vue';
  import InterestItem from '../public/interest.vue';
  import $api from 'api';
  export default {
    data(){
      return {
        loading: false
      }
    },
    components:{
      IndustryItem,
      InterestItem
    },
    computed:{
      noScroll () {
        return this.loading || this.industry.noMore;
      },
      ...mapState({
        industry: state => state.moments.industry
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('moments/RESET_INDUSTRY_LIST');
      next();
    },
    methods:{
      loadMore() {
        this.loading = true;
        this.$store.dispatch('moments/LOAD_INDUSTRY_LIST').then(()=>{
          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
        });
      },
      goInterest(item){
        this.$router.push({path:`/moments/interest/${item.aid}`,query:{item:'basic'}});
      }
    },
    created(){
      if(!this.industry.list.length){
        this.loadMore();
      }
    }
  }
</script>
