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
            <Item v-for="(item,index) in photo.list" :class="$style.item" :key="index" :dataInfo="item" @click="goEdit(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <publishBtn text="传照片" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/photo.vue';
  import $api from 'api';
  import publishBtn from '../../components/publish';
  export default {
    components:{
      Item,
      publishBtn
    },
    data(){
      return {
        loading: false
      }
    },
    beforeRouteLeave (to, from, next){
      if(to.name != 'photo-detail'){
        this.$store.dispatch('activity/RESET_PHOTO_LIST');
      }
      next();
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
        this.$store.dispatch('activity/LOAD_PHOTO_LIST',{uid:this.$parent.uid}).then(()=>{
          this.loading = false;
        });
      },
      goEdit(item) {
        this.$router.push(`/publish/photo?pid=${item.pid}`);
      }
    },
    created(){
      if(!this.photo.list.length){
        this.loadMore();
      }
    }
  }
</script>
