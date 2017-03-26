<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        display: flex;
        padding: 6px 0 12px;
        border-top: 1px solid @line-color-split;
    }
    .portrait{
        width: 60px;
        margin-right: 6px;
        .userText{
            margin-top: 6px;
        }
    }
    .desc{
        position: relative;
        flex: 1;
        .exchange,.verify{
            position: absolute;
            right: 12px;
            top: 6px;
            height: 24px;
            line-height: 24px;
            color: @theme-color;
        }
        .gray{
            color: #fff;
            background-color: #C7CED2;
            border-color:  #C7CED2 !important;
        }
        .exchange{
            width: 80px;
            border: 1px solid @theme-color;
        }
        .vbtn{
            display: inline-block;
            width: 60px;
            border: 1px solid @theme-color;
            &.noborder{
                background-color: #fff;
                border: none;
             }
        }
        & > div {
                margin-bottom: 11px;
            }
        .desText{
            line-height: 1.3rem;
        }
    }
</style>
<template>
    <li :class="$style.content">
        <div :class="[$style.portrait,'text-center']">
            <div :class="$style.pic">
                <imgContain :imgUrl="dataInfo.photo" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
            </div>
            <div :class="[$style.userText,'color-topic']">{{dataInfo.name}}</div>
        </div>
        <div :class="$style.desc">
            <template v-if="!isSelf && type=='exchange'">
                <span :class="[$style.exchange,'text-center']" v-if="dataInfo.exchange_status == 0" @click="exchange('exchange')">交换联系方式</span>
                <span :class="[$style.exchange,$style.gray,'text-center']" v-if="dataInfo.exchange_status == 1" @click="exchange('cancel')">撤销</span>
                <span :class="[$style.exchange,'text-center']" v-if="dataInfo.exchange_status == 2" @click="exchange('contact')">查看联系方式</span>
            </template>
            <template v-if="!isSelf && type=='verify'">
                <div :class="$style.verify">
                    <span :class="[$style.vbtn,'text-center']" @click="verify(1)">同意</span>
                    <span :class="[$style.vbtn,$style.gray,'text-center']" @click="verify(0)">拒绝</span>
                </div>
            </template>
            <template v-if="!isSelf && type=='master'">
                <div :class="$style.verify">
                    <span :class="[$style.vbtn,$style.noborder,'color-topic','text-center']" @click="kick()">踢出圈子</span>
                    <span :class="[$style.vbtn,$style.noborder,'text-center']" @click="goDetail()">查看详情</span>
                </div>
            </template>
           <div>{{dataInfo.company || '公司未填写'}}</div>
           <div>{{dataInfo.department || '部门未填写'}}</div>
           <div>{{dataInfo.detail_job || '职位未填写'}}</div>
           <div :class="$style.desText">我的资源：<span>{{dataInfo.resource_description}}</span></div>
        </div>
    </li>
</template>
<script>
  import {mapState} from 'vuex';
  import $api from  'api';
    export default{
      props:{
        dataInfo:{
          type:Object,
          require: true
        },
        type:String
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
          let {uid} = this.dataInfo;
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
            this.goDeatil();
          }
        },
        verify(val){
          this.$emit('verify',val,this.dataInfo);
        },
        kick(){
          this.$emit('kick',this.dataInfo);
        },
        goDetail(){
          this.$router.push(`/mine/contacts/${this.dataInfo.uid}`);
        }
      }
    }
</script>
