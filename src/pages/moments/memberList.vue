<style lang="less" module>
    @import '../../assets/less/const.less';
    .info{
        margin-bottom: 6px;
        background-color: #fff;
    }

</style>
<template>
    <div>
        <Loading v-if="loading"></Loading>
        <div v-else>
            <div :class="['list-content',$style.info,$style.attendedList]" v-if="isCreater && verifyList.length">
                <h3 class="item-header">申请名单</h3>
                <ul>
                    <attendedItem :dataInfo="contact" type="verify" v-for="contact in verifyList" @verify="verify"></attendedItem>
                </ul>
            </div>
            <div :class="['list-content',$style.info,$style.attendedList]" v-if="memberList.length">
                <h3 class="item-header">成员名单</h3>
                <ul>
                    <attendedItem :dataInfo="contact" :type="memberType" v-for="contact in memberList" @kick="kick"></attendedItem>
                </ul>
            </div>
        </div>
        <div v-if="!loading && isEmpty" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
    import $api from 'api';
    import attendedItem from './attendedItem.vue';
    export default {
        data(){
            return {
                isCreater: false,
                verifyList:[],
                memberList:[],
                loading: true
            }
        },
        components:{
          attendedItem
        },
        computed:{
          memberType(){
            if(this.isCreater){
              return 'master';
            }
            return 'exchange';
          },
          isEmpty(){
            return this.memberList.length + this.verifyList.length == 0;
          }
        },
        methods:{
          verify(val,contact){
            if(val){
                this.agree(contact);
            }else{
              this.reject(contact);
            }
          },
          kick(contact){
            const {cid} = this.$route.params;
            const {uid} = contact;
            $api.post('/Circle/cancelApply',{cid,uid})
              .then(res=>{
                this.$toast(res.msg || '处理成功');
                if(res.result){
                  var index =  this.memberList.indexOf(contact);
                  if(~index){
                    this.memberList.splice(index,1);
                  }
                }
              },err=>{
                this.$toast('服务器异常')
              })
          },
          reject(contact){
            const {cid} = this.$route.params;
            const {uid} = contact;
            $api.post('/Circle/cancelApply',{cid,uid})
              .then(res=>{
                this.$toast(res.msg || '处理成功');
                if(res.result){
                  var index =  this.verifyList.indexOf(contact);
                  if(~index){
                    this.verifyList.splice(index,1);
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
                  var index =  this.verifyList.indexOf(contact);
                  if(~index){
                    this.verifyList.splice(index,1);
                  }
                }
              },err=>{
                this.$toast('服务器异常')
              })
            }
        },
        created(){
            $api.post('/Circle/getMembers',{cid:this.$route.params.cid})
                .then(res=>{
                    this.loading = false;
                    if(res.me){
                      this.isCreater = true;
                      this.memberList = [...res.others];
                      this.verifyList = [...res.unpassed];
                    }else{
                      this.memberList = [...res.others];
                    }
                },err=>{
                    this.$toast('服务器异常');
                })
        }
    }
</script>

