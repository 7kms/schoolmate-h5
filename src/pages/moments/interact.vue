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
            <Item v-for="(item,index) in interact.list" :class="$style.item" :key="index" :dataInfo="item"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && interact.noMore && interact.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/interact.vue';
  import $api from 'api';
  export default {
    data(){
      return {
        loading: false
      }
    },
    components:{
      Item
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
      loadMore() {
        this.loading = true;
        this.$store.dispatch('interact/LOAD_INTERACT_LIST',{cid: this.$route.params.id}).then(()=>{
          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
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
