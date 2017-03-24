<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
        padding: 12px 0 12px 12px;
    }
    .user{
        position: relative;
        padding-right: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid @line-color-split;
        .info{
            display: flex;
            .portrait{
                width: 40px;
            }
            .text{
                flex: 1;
                display: flex;
                margin-left: 12px;
                justify-content: space-between;
            }
            .text1{
                height: 40px;
                flex-direction: column;
                padding: 2px 0;
            }
        }
        .info2{
            margin-top: 6px;
        }
        .infoBtn{
            position: absolute;
            width: 80px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            right: 12px;
            top: 0;
            color: @theme-color;
            border: 1px solid @theme-color;
            &.exchanged{
                color: #fff;
                background-color: @font-color-weak;
                 border: none;
             }
        }
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
    .icon{
        width: 12px;
        height: 12px;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconLocation{
             background-image: url('../../assets/images/icon-location.png');
         }
    }

</style>
<template>
    <div :class="$style.content">
        <div :class="$style.user">
            <template v-if="!isSelf">
                <span :class="[$style.infoBtn]" v-if="dataInfo.exchange_status == 0" @click.prevent="exchange('exchange')">交换联系方式</span>
                <span :class="[$style.infoBtn,{[$style.exchanged]:true}]" v-if="dataInfo.exchange_status == 1" @click.prevent="exchange('cancel')">撤销</span>
                <span :class="[$style.exchange,'text-center']" v-if="dataInfo.exchange_status == 2" @click.prevent="exchange('contact')">查看联系方式</span>
            </template>
            <div :class="$style.info">
                <div :class="$style.portrait">
                    <img :src="dataInfo.photo" width="40" height="40">
                </div>
                <div :class="[$style.text,$style.text1]">
                    <div>
                        <span>{{dataInfo.enrol_time.slice(0,4)}}级</span><span> | </span><span>{{dataInfo.major}}</span>
                    </div>
                    <div>
                        <span>{{dataInfo.company}}</span>
                    </div>
                </div>
            </div>
            <div :class="[$style.info,$style.info2]">
                <div :class="$style.portrait">
                    <span class="color-topic">{{dataInfo.name}}</span>
                </div>
                <div :class="$style.text">
                    <div>{{dataInfo.detail_job}}</div>
                    <div>
                        <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                        <span class="inline-block">{{dataInfo.province + '-' + dataInfo.city}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.desc">
            <!--<div :class="['color-topic',$style.dfn]">岗位描述:</div><div :class="$style.text" v-html="transform(dataInfo.resource_description)"></div>-->
            <div :class="['color-topic',$style.dfn]">岗位描述:</div><div :class="$style.text" v-transform="dataInfo.resource_description"></div>
        </div>
    </div>
</template>
<script>
  import {mapState} from 'vuex'
  import $api from  'api';
  export default {
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
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

        }
      }
    }
  }
</script>