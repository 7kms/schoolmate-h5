<style lang="less" module>
    .item{
        margin-bottom: 6px;
    }
</style>
<template>
    <div>
        <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="noScroll"
                infinite-scroll-immediate-check="false"
                infinite-scroll-distance="80">
            <Item v-for="(item,index) in photo.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && photo.noMore && photo.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/photo.vue';
  import $api from 'api';
  export default {
    components:{
      Item
    },
    data(){
      return {
        loading: false
      }
    },
    computed:{
      noScroll(){
        return this.loading || this.photo.noMore;
      },
      ...mapState({
        photo: state => state.activity.photo
      })
    },
    methods:{
      onPublish() {
        this.$router.push(`/publish/photo`);
      },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('activity/LOAD_PHOTO_LIST',{cid: this.$route.params.id}).then(()=>{
          this.loading = false;
        });
      },
      goDetail(item) {
        item.hit = parseInt(item.hit) + 1;
        this.$router.push(`/photo-detail/${item.pid}`);
      }
    },
    created(){
      if(!this.photo.list.length){
        this.loadMore();
      }
    }
  }
</script>
