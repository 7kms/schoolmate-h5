<style lang="less" module>
    @import '../../assets/less/const.less';
    .item{
        margin-bottom: 6px;
    }
    .content{
        padding-top: @header-height + @item-header-height;
    }
    .search{
        position: fixed;
        top:  @header-height;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 35px;
        display: flex;
        padding: 5px 12px;
        background-color:@body-color;
        .input{
            margin-left: 5px;
            flex: 1;
            input{
                width: 100%;
                padding: 0 10px;
                height: 25px;
                border-radius: 13px;
                border: none;
                outline: none;
                color: @font-color-base;
            }
        }
        .btn{
            padding-left: 5px;
            line-height: 25px;
        }
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
    <div :class="[$style.content,'page-content']">
        <div :class="$style.search">
            <div :class="$style.input">
                <input type="text" v-model="industry.keywords">
            </div>
            <span :class="[$style.btn,'size-topic','color-theme']" @click="search">搜索</span>
        </div>
        <div :class="[$style.bar,'size-topic','color-theme']" v-if="isRegistered && myList.length">
            <span>我在的行业圈</span>
        </div>
        <ul v-if="isRegistered">
            <Item v-for="(item,index) in myList" :class="$style.item" :key="index" :dataInfo="item" @click.native="goDetail(item)"></Item>
        </ul>
        <div :class="[$style.bar,'size-topic','color-theme']" v-if="list.length">
            <span>其他行业圈子</span>
        </div>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-distance="80">
            <Item v-for="(item,index) in list" :class="$style.item" :key="index" :dataInfo="item" @click.native="goDetail(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <publishBtn text="问校友" type="feedback"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/industry.vue';
  import $api from 'api';
  import Util from '../../util'
  import publishBtn from '../../components/publish';
  export default {
    data(){
      return {
        loading: false
      }
    },
    components:{
      Item,
      publishBtn
    },
    computed:{
      noScroll () {
        return this.loading || this.industry.noMore;
      },
      ...mapState({
        profile:state =>state.user.profile,
        industry:state => state.moments.industry,
        list: state => state.moments.industry.list.filter(item=>!item.belongme),
        myList: state => state.moments.industry.list.filter(item=>item.belongme)
      }),
      isRegistered(){
        return this.profile.first_logined == '0';
      }
    },
    beforeRouteLeave (to, from, next) {
      if(to.name == 'industry-detail'){
        this.$store.dispatch('moments/RESET_INDUSTRY_LIST',{noRefresh:true});
      }
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
      search(){
        this.$store.dispatch('moments/RESET_INDUSTRY_LIST');
        this.$store.dispatch('moments/LOAD_INDUSTRY_LIST').then(() => {
             this.loading = false;
          },(err)=>{
              this.loading = false;
              this.$toast({message: err});
          });
      },
      goDetail(item){
        Util.isAuthored('请到“我的”里注册后操作').then(() => {
          this.$router.push(`/moments/industry/${item.cid}`);
        },()=>{});
      }
    },
    created(){
      this.$store.dispatch('moments/RESET_INDUSTRY_LIST');
      if(!this.industry.list.length){
        this.loadMore();
      }
    }
  }
</script>
