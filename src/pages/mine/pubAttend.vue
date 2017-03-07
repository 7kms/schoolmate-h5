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
            <Item v-for="(item,index) in attend.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && attend.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/column.vue';
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
      publishBtn
    },
    computed:{
      noScroll () {
        return this.loading || this.attend.noMore;
      },
      ...mapState({
        attend: state => state.activity.attend
      })
    },
    methods:{
      loadMore() {
        this.loading = true;
        this.$store.dispatch('activity/LOAD_ATTEND_LIST',{uid:this.$parent.uid}).then(()=>{
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
      if(!this.attend.list.length){
        this.loadMore();
      }
    }
  }
</script>
