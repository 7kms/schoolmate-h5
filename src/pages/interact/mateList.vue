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
            <Item v-for="(item,index) in mates.list" :class="$style.item" :key="index" :dataInfo="item"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && mates.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
        <publishBtn text="问校友" type="feedback"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/mate.vue';
  import SearchFilter from './mateFilter.vue';
  import $api from 'api';
  import publishBtn from '../../components/publish';
  export default {
    data(){
      return {
        initFilter: false,
        loading: true
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
      }
    },
    created(){
      this.$store.dispatch('interact/RESET_MATES_LIST');
      this.$store.dispatch('interact/RESET_MATES_NAV');
      this.$store.dispatch('interact/RESET_MATES_CONDITION');
      if(!this.mates.list.length){
        this.loadMore();
      }
    }
  }
</script>
