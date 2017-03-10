<style lang="less" module>
    @import '../../assets/less/const.less';
    .list{
        background-color: #fff;
    }
</style>
<template>
    <div>
        <ul :class="$style.list"
            v-infinite-scroll="loadMore"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="noScroll"
            infinite-scroll-distance="80">
            <Item v-for="(item,index) in contact.list" :class="$style.item" :key="index" :dataInfo="item" @click="goDetail(item)"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && contact.list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
  import Item from '../public/contact.vue'
  import { mapState } from 'vuex'
  import $api from 'api'
  export default {
    components:{
      Item
    },
    data(){
      return {
          loading: true,
          list:[]
      }
    },
    computed:{
      noScroll () {
        return this.loading || this.contact.noMore;
      },
      ...mapState({
        contact: state => state.mine.contact
      })
    },
    methods:{
      goDetail(contact){
        this.$router.push(`/mine/contacts/${contact.uid}`);
      },
      loadMore() {
        this.loading = true;
        this.$store.dispatch('contact/LOAD_CONTACT_LIST').then(()=>{
              this.loading = false;
          },(err)=>{
              this.loading = false;
              this.$toast({message: err});
          });
      }
    },
    created(){
      const {channel,rid} = this.$route.query;
//      if(channel == 'resource'){
//        $api.post('/Help/getCoList',{rid})
//          .then(res=>{
//              this.loading = false;
//              this.list = [...res.data];
//        },error=>{
//            this.$toast('服务器异常')
//        })
//      }else if(channel == 'friends'){
//
//      }
      if(!this.contact.list.length){
        this.loadMore();
      }

    }
  }
</script>