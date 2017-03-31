<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
        padding: 12px 0 12px 12px;
    }
    .desc{
        padding: 6px 12px 0 0;
        line-height: 1.4rem;
        display: flex;
        .dfn{
            width: 60px;
        }
        .text{
            flex: 1;
        }
    }

</style>
<template>
    <div :class="$style.content">
        <UserCard :dataInfo="dataInfo"></UserCard>
        <div :class="$style.desc">
            <!--<div :class="['color-topic',$style.dfn]">岗位描述:</div><div :class="$style.text" v-html="transform(dataInfo.resource_description)"></div>-->
            <div :class="['color-topic',$style.dfn]">自我描述:</div><div :class="$style.text" v-transform="dataInfo.resource_description"></div>
        </div>
    </div>
</template>
<script>
  import {mapState} from 'vuex'
  import $api from  'api';
  import UserCard from './userCard.vue'
  export default {
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    components:{
      UserCard
    },
    computed:{
      ...mapState({
        profile:(state)=>state.user.profile
      }),

      isSelf(){
        return this.profile.uid == this.dataInfo.uid
      }
    },
    methods:{
      exchange(type){
        var {uid} = this.dataInfo;
        if(type == 'exchange'){
          $api.post('/Profile/requestExchange',{uid})
            .then(res => {
            this.$toast(res.msg);
            if(res.result) {
              this.dataInfo.exchange_status = 1;
            }
          },res=>{
            this.$toast('服务器异常')
          });
        }else if(type == 'cancel'){
          $api.post('/Profile/cancelExchange',{uid})
            .then(res => {
            this.$toast(res.msg)
            if(res.result) {
              this.dataInfo.exchange_status = 0;
            }
          },res=>{
            this.$toast('服务器异常')
          })
        }else{
          this.$router.push(`/mine/contacts/${this.dataInfo.uid}`);
        }
      }
    }
  }
</script>