<style lang="less" module>
    @import '../../assets/less/const.less';
    .list{
        background-color: #fff;
    }
</style>
<template>
    <div>
        <ul :class="$style.list">
            <Item @reject="reject" @agree="agree" v-for="contact in list"  :dataInfo="contact" :showBtn="true"></Item>
        </ul>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading && list.length == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
  import Item from '../public/contact.vue'
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
    methods:{
      goDetail(contact){
        this.$router.push(`/mine/contacts/${contact.uid}`);
      },
      reject(contact){
        const {cid} = this.$route.params;
        const {uid} = contact;
        $api.post('/Circle/cancelApply',{cid,uid})
          .then(res=>{
                this.$toast(res.msg || '处理成功');
              if(res.result){
                  var index =  this.list.indexOf(contact);
                  if(~index){
                      this.list.splice(index,1);
                  }
              }
          },err=>{
            this.$toast('服务器异常')
          })
      },
      agree(contact){
        const {cid} = this.$route.params;
        const {uid} = contact;
        $api.post('/Circle/passApply',{cid,uid})
          .then(res=>{
            this.$toast(res.msg || '处理成功');
              if(res.result){
                 var index =  this.list.indexOf(contact);
                  if(~index){
                      this.list.splice(index,1);
                  }
              }
          },err=>{
            this.$toast('服务器异常')
          })
      }
    },
    created(){
      const {cid} = this.$route.params;
      $api.post('/Circle/getUnpassedMembers',{cid})
        .then(res=>{
          this.loading = false;
          this.list = res.data;
        },error=>{
          this.$toast('服务器异常')
        });
    }
  }
</script>