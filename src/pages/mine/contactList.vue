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
            <Item v-for="(item,index) in contact.list" :class="$style.item" :key="index"
                  :dataInfo="item"
                  :showBtn="item.verify_status"
                  :showRemove="!item.verify_status"
                  @click.native="goDetail(item)"
                  @agree="agree"
                  @reject="reject"
                  @remove="remove"
            ></Item>
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
          loading: false,
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
      },
      agree(contact){
        const {fid} = contact;
         this.$dialog.confirm('同意交换联系方式后,双方可查看详细资料').then(data=>{
            return $api.post('/Profile/handleExchange',{fid,status:1});
         },data=>{
            return false;
         }).then(res=>{
            if(!res)return false;
            if(res.result){
              this.$toast('操作成功');
              contact.verify_status = false;
            }else{
              this.$toast(res.msg);
            }
        },error=>{
         this.$toast('服务器异常')
        });
      },
      reject(contact){
        const {fid} = contact;
        this.$dialog.confirm('拒绝交换联系方式,并将其从列表中删除?').then(data=>{
          return $api.post('/Profile/handleExchange',{fid,status:0});
        },data=>{
          return false;
        }).then(res=>{
          if(!res)return false;
          if(res.result){
            this.$toast('操作成功');
            this.$store.dispatch('contact/REMOVE_CONTACT',contact);
          }else{
            this.$toast(res.msg);
          }
        },error=>{
          this.$toast('服务器异常')
        });
      },
      remove(contact){
        const {fid} = contact;
        this.$dialog.confirm('移除通讯录?').then(data=>{
          return $api.post('/Profile/delExchange',{fid});
        },data=>{
          return false;
        }).then(res=>{
          if(!res)return false;
          if(res.result){
            this.$toast('操作成功');
            this.$store.dispatch('contact/REMOVE_CONTACT',contact);
          }else{
            this.$toast(res.msg);
          }
        },error=>{
          this.$toast('服务器异常')
        });
      }
    },
    created(){
      if(!this.contact.list.length){
        this.loadMore();
      }
    }
  }
</script>