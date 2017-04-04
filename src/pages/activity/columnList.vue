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
        beforeRouteLeave(to, from, next) {
          if(to.name == 'column-detail'){
            this.$store.dispatch('activity/CHANGE_COLUMN_STATUS',{noRefresh:true});
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
            needRefresh(item){
              if(item.finished == '1' || item.attended){
                return false;
              }
              if(item.fee && parseFloat(item.fee) > 0){
                return true;
              }else{
                return false;
              }
            },
            goDetail(item) {
                if(item.view_detail){
                  if(this.needRefresh(item)){
                    window.location.href = `/activity/column-detail?id=${item.aid}`;
                  }else{
                    this.$router.push({path:'/activity/column-detail',query:{id:item.aid}});
                  }

//                  this.$router.push({path:'/activity/column-detail',query:{id:item.aid}});
//                  this.$router.push(`/activity/column-detail/${item.aid}`);
                }else{
                    this.$toast('你没有权限查看详情');
                }
            }
        },
        created(){
          this.$store.dispatch('activity/RESET_COLUMN_LIST');
          if(!this.column.list.length){
            this.loadMore();
          }
        }
    }
</script>
