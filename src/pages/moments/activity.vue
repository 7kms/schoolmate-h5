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
            <Item v-for="(item,index) in column.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)" @remove="remove"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && column.noMore && column.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
        <publishBtn v-if="showPublish" text="发活动" @click="onPublish"></publishBtn>
    </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Item from '../public/column.vue';
  import publishBtn from '../../components/publish';
  import $api from 'api';
  export default {
    data(){
      return {
        loading: false
      }
    },
    props:{
      showPublish:Boolean
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
    methods:{
      onPublish() {
        this.$router.push(`/publish/activity`);
      },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('activity/LOAD_COLUMN_LIST',{cid: this.$route.params.id}).then(()=>{
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
          if(this.$parent.basicInfo.is_member){
            if(this.needRefresh(item)){
              window.location.href = `/activity/column-detail?id=${item.aid}`;
            }else{
              this.$router.push({path:'/activity/column-detail',query:{id:item.aid}});
            }
          }else{
               this.$dialog.confirm('请到【简介】中点击【申请加入】')
               .then(()=>{
                    this.$parent.switchItem('basic');
               },()=>{});
          }
      },
      remove(item){
        $api.post('/activity/delActivity',{ aid:item.aid})
          .then(res=>{
          this.$toast(res.msg);
          if(res.result){
            this.$store.dispatch('activity/REMOVE_COLUMN',item);
          }
        },err=>{
          this.$toast('服务器异常');
        });
      }
    },
    created(){
      if(!this.column.list.length){
        this.loadMore();
      }
    }
  }
</script>
