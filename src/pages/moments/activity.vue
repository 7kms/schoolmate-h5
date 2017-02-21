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
            <Item v-for="(item,index) in column.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/column.vue';
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
        return this.loading || this.column.noMore;
      },
      ...mapState({
        column: state => state.activity.column
      })
    },
    beforeRouteLeave (to, from, next) {
      if(to.name != 'column-detail'){
        this.$store.dispatch('activity/RESET_COLUMN_LIST');
      }
      next();
    },
    methods:{
      loadMore() {
        this.loading = true;
        this.$store.dispatch('activity/LOAD_COLUMN_LIST').then(()=>{
          this.loading = false;
        },(err)=>{
          this.loading = false;
          this.$toast({message: err});
        });
      },
      goDetail(item) {
        this.$router.push(`/column-detail/${item.aid}`);
      }
    },
    created(){
      if(!this.column.list.length){
        this.loadMore();
      }
    }
  }
</script>
