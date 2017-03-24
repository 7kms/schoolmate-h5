<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-bottom: @header-height;
    }
    .item{
        margin-top: 6px;
        padding: 6px 12px;
        background-color: #fff;
        .bar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
    }
    .user{
        position: relative;
        padding-right: 12px;
        padding-bottom: 6px;
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
    }
    .title{
        border-left: 2px solid @font-color-topic;
        padding-left: 6px;
    }
    .icon{;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconMember{
            width: 20px;
            height: 20px;
            background-image: url('../../assets/images/icon-member.png');
         }
         &.iconArrow{
              width: 12px;
              height: 12px;
              background-image: url('../../assets/images/icon-arrow.png');
          }
    }
    .desc{
        line-height: 1.4rem;
    }
    .tagContent{
        color:@theme-color;
        .tag{
            height: 24px;
            margin-bottom: 6px;
            margin-right: 5px;
            line-height: 24px;
            padding: 0 12px;
            border: 1px solid @theme-color;
            border-radius: 15px;
        }
    }
    .memberContent{

        &::after{
        content: '';
        display: block;
        height: 0;  clear:both;
         }
        .member{
            float: left;
            width: 40px;
            overflow: hidden;
            margin-bottom: 12px;
            margin-right: ~"calc((100% - 200px)/4)";
            &:nth-child(5n){
                margin-right: 0;
            }
            .img{
                margin-bottom: 6px;
            }
        }
    }
    .join{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height:  @header-height;
        line-height:  @header-height;
        background-color: @theme-color;
        color:#fff
    }
    .quit{
        width: 164px;
        height: 32px;
        margin: 12px auto;
        line-height: 32px;
        border-radius: 16px;
        color: #fff;
        background-color: @theme-color;
    }
</style>
<template>
    <div :class="$style.content">
        <ul>
            <li :class="$style.item" v-if="dataInfo.created_by_me">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">我的信息</span>
                    <span class="inline-block">
                        <i :class="['inline-block',$style.icon,$style.iconMember]"></i><span class="inline-block color-hint">圈主</span>
                    </span>
                </div>
                <div :class="$style.user">
                    <div :class="$style.info">
                        <div :class="$style.portrait">
                            <imgContain :imgUrl="dataInfo.me.photo" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
                        </div>
                        <div :class="[$style.text,$style.text1]">
                            <div>
                                <span>{{dataInfo.me.enrol_time.slice(0,4)}}级</span><span> | </span><span>{{dataInfo.me.major}}</span>
                            </div>
                            <div>
                                <span>{{dataInfo.me.company}}</span>
                            </div>
                        </div>
                    </div>
                    <div :class="[$style.info,$style.info2]">
                        <div :class="$style.portrait">
                            <span class="color-topic">{{dataInfo.me.name}}</span>
                        </div>
                        <div :class="$style.text">
                            <div>{{dataInfo.me.detail_job}}</div>
                        </div>
                    </div>
                </div>
            </li>
            <li :class="$style.item">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">圈子介绍</span>
                </div>
                <div :class="$style.desc" v-transform="dataInfo.c_description"></div>
            </li>
            <li :class="$style.item">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">标签</span>
                </div>
                <div :class="$style.tagContent">
                    <span :class="[$style.tag,'inline-block']" v-for="tag of tags">{{tag}}</span>
                </div>
            </li>
            <li :class="$style.item" @click="goMemberList">
                <div :class="$style.bar">
                    <span :class="[$style.title,'color-topic','inline-block']">成员</span>
                    <span style="flex:1">（加入圈子可交换联系方式）</span>
                    <i :class="[$style.icon,$style.iconArrow,'inline-block']"></i>
                </div>
                <div :class="$style.memberContent">
                    <div :class="$style.member" v-for="member of dataInfo.members">
                        <div :class="$style.img">
                            <imgContain :imgUrl="member.photo" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
                        </div>
                        <div class="one-line">{{member.name}}</div>
                    </div>
                </div>
            </li>
        </ul>
        <template v-if="!dataInfo.created_by_me">
            <div :class="[$style.join,'text-center']" v-if="!dataInfo.is_member" @click="attend">
                <span class="size-header">申请加入</span>
            </div>
            <div :class="[$style.quit,'text-center','size-header']" v-else @click="exit">
                <span>退出圈子</span>
            </div>
        </template>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  import $api from 'api'
  export default {
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    computed: {
      tags(){
        if(!this.dataInfo.labels)return [];
        return this.dataInfo.labels.split(/\s+/);
      }
    },
    methods:{
      goMemberList(){
        var id = this.$route.params.id;
        this.$router.push(`/moments/interest/${id}/member`);
      },
      attend(){
        this.$dialog.confirm('确认要加入?').then(data=>{
          return $api.post('/Circle/attend',{cid:this.dataInfo.cid});
        },data=>{
          return false;
        }).then(res=>{

          if(!res)return false;
          if(res.result){
            this.dataInfo.is_member = !this.dataInfo.is_member;
            this.$toast('加入成功')
          }else{
            this.$toast(res.msg);
          }
        },error=>{
          this.$toast('服务器异常')
        });
      },
      exit(){
        this.$dialog.confirm('确认要退出?').then(data=>{
          return $api.post('/Circle/cancel',{cid:this.dataInfo.cid});
        },data=>{
            return false;
        }).then(res=>{
            if(!res)return false;
            if(res.result){
              this.dataInfo.is_member = !this.dataInfo.is_member;
              this.$toast('退出成功')
            }else{
              this.$toast(res.msg);
            }
        },error=>{
          this.$toast('服务器异常')
        });
      }
    }
  }
</script>