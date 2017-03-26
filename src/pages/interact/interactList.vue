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
            <Item v-for="(item,index) in interact.list"
                  :class="$style.item" :key="index"
                  :dataInfo="item"
                  @remove="remove"
                  @showSwiper="showSwiper"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <publishBtn text="发需求" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import swiper from  '../../components/swiper';
  import Item from '../public/interact.vue';
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
        return this.loading || this.interact.noMore;
      },
      ...mapState({
        interact: state => state.interact.interact
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('interact/RESET_INTERACT_LIST');
      if(this.swiperInstance){
        this.swiperInstance.close();
        this.swiperInstance = null;
      }
      next();
    },
    methods:{
        showSwiper(info){
            this.swiperInstance = swiper(info);
        },
        onPublish() {
            Util.isAuthored().then(() => {
                this.$router.push(`/publish/interact`);
            },()=>{});
        },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('interact/LOAD_INTERACT_LIST').then(()=>{

          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
        });
      },
      remove(item){
        $api.post('/Help/revoke',{ rid:item.rid})
          .then(res=>{
            this.$toast(res.msg);
            if(res.result){
              this.$store.dispatch('interact/REMOVE_INTERACT',item);
            }
          },err=>{
            this.$toast('服务器异常');
          });
      }
    },
    created(){
      if(!this.interact.list.length){
        this.loadMore();
      }
    }
  }
</script>
