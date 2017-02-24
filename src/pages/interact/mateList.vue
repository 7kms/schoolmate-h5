<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-top: @header-height + 30;
    }
    .item{
        margin-bottom: 6px;
    }
</style>
<template>
    <div :class="[$style.content,'page-content']">
        <SearchFilter></SearchFilter>
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-distance="80">
            <Item v-for="(item,index) in mates.list" :class="$style.item" :key="index" :dataInfo="item" @cancelExchange="cancelExchange" @exchange="exchange"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from './mate.vue';
  import SearchFilter from './mateFilter.vue';
  import $api from 'api';
  import publishBtn from '../../components/publish';
  export default {
    data(){
      return {
        loading: false
      }
    },
    components:{
      Item,
      SearchFilter,
      publishBtn
    },
    computed:{
      noScroll () {
        return this.loading || this.mates.noMore;
      },
      ...mapState({
        mates: state => state.interact.mates
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('interact/RESET_MATES_LIST');
      next();
    },
    methods:{
      onPublish() {
        this.$router.push(`/publish/interact`);
      },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('interact/LOAD_MATES_LIST').then(()=>{
          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
        });
      },
        exchange(item){
            var {uid} = item;
            $api.post('/index.php/Profile/requestExchange',{uid})
                    .then(res => {
                if(res.result){
                    this.$toast(res.msg)
                }
            },res=>{
                this.$toast('服务器异常')
            })
        },
        cancelExchange(item){
          var {uid} = item;
            $api.post('/index.php/Profile/cancelExchange',{uid})
                    .then(res => {
                        if(res.result){
                this.$toast(res.msg)
            }
            },res=>{
                this.$toast('服务器异常')
            })
        }
    },
    created(){
      if(!this.mates.list.length){
        this.loadMore();
      }
    }
  }
</script>
