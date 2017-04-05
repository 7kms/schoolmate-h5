<style lang="less" module>
    .item{
        margin-bottom: 6px;
    }
</style>
<template>
    <div>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-distance="80">
            <Item v-for="(item,index) in interact.list" :class="$style.item" :key="index" :dataInfo="item"  @remove="remove" @showSwiper="showSwiper"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && interact.noMore && interact.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
        <publishBtn v-if="showPublish" text="发需求" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/interact.vue';
  import publishBtn from '../../components/publish';
  import swiper from  '../../components/swiper';
  import $api from 'api';
  export default {
    data(){
      return {
        loading: false
      }
    },
    props:{
      showPublish:Boolean
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
    methods:{
      onPublish() {
        this.$router.push(`/publish/interact`);
      },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('interact/LOAD_INTERACT_LIST',{cid: this.$route.params.id}).then(()=>{
          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
        });
      },
      showSwiper(info){
         this.$parent.swiperInstance = swiper(info);
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
