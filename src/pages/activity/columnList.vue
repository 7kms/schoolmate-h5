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
            <Item v-for="(item,index) in column.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)"></Item>
         </ul>
        <Loading v-if="loading"></Loading>
        <publishBtn text="发活动" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import Item from '../public/column.vue';
    import $api from 'api';
    import publishBtn from '../../components/publish';
    import Swiper from '../../components/swiper';
    import Util from '../../util'
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
            onPublish() {
              Util.isAuthored().then(()=>{
                this.$router.push(`/publish/activity`);
              },()=>{})
            },
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
                this.$router.push(`/activity/column-detail/${item.aid}`);
            }
        },
        created(){
          if(!this.column.list.length){
            this.loadMore();
          }
//            Swiper()
        }
    }
</script>
