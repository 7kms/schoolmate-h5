<style lang="less" module>
    .item{
        margin-bottom: 6px;
    }
</style>
<template>
    <div class="page-content">
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-distance="80">
            <Item v-for="(item,index) in interest.list" :class="$style.item" :key="index" :dataInfo="item" @click.native="goDetail(item)" @verify="goVerify"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <publishBtn text="建圈子" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/interest.vue';
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
        return this.loading || this.interest.noMore;
      },
      ...mapState({
        interest: state => state.moments.interest
      })
    },
    beforeRouteLeave(to,from,next){
      if(to.name == 'interest-detail'){
        this.$store.dispatch('moments/CHANGE_INTEREST_STATUS',{noRefresh:true});
      }
      next();
    },
    methods:{
      onPublish() {
        Util.isAuthored().then(() => {
          this.$router.push(`/publish/interest`);
        },()=>{});
      },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('moments/LOAD_INTEREST_LIST').then(()=>{
          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
        });
      },
      goVerify(item){
        this.$router.push({path:`/moments/interest/${item.cid}/verify`});
      },
      goDetail(item) {
        this.$router.push({path:`/moments/interest/${item.cid}`,query:{item:'basic'}});
      }
    },
    created(){
      this.$store.dispatch('moments/RESET_INTEREST_LIST');
      if(!this.interest.list.length){
        this.loadMore();
      }
    }
  }
</script>
