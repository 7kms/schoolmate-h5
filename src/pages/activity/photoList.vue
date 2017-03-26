<style lang="less" module>
    .item{
        margin-bottom: 6px;
    }
</style>
<template>
    <div class="page-content">
         <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="80">
            <Item v-for="(item,index) in photo.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)"></Item>
         </ul>
         <Loading v-if="loading"></Loading>
        <publishBtn text="发照片" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import Item from '../public/photo.vue';
    import $api from 'api';
    import Util from '../../util'
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
      beforeRouteLeave(to, from, next) {
        if(to.name == 'photo-detail'){
          this.$store.dispatch('activity/CHANGE_PHOTO_STATUS',{noRefresh:true});
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
            Util.isAuthored().then(()=>{
              this.$router.push(`/publish/photo`);
            },()=>{})
          },
          loadMore() {
            this.loading = true;
            this.$store.dispatch('activity/LOAD_PHOTO_LIST').then(()=>{
                this.loading = false;
            });
          },
          goDetail(item) {
              Util.isAuthored().then(() => {
                item.hit = parseInt(item.hit) + 1;
                this.$router.push(`/activity/photo-detail/${item.pid}`);
              },()=>{});
          }
        },
        created(){
            this.$store.dispatch('activity/RESET_PHOTO_LIST');
            if(!this.photo.list.length){
              this.loadMore();
            }
        }
    }
</script>
