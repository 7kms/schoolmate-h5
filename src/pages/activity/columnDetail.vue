<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-bottom: 40px;
    }
    .cover{
        height: 225px;
    }
    .info{
        margin-bottom: 6px;
        background-color: #fff;
    }
    .desc{
        position: relative;
        padding: 6px 6px 12px 12px;
        .ing{
            position: absolute;
            right: 0;
            top: 6px;
            width: 94px;
            height: 27px;
            line-height: 27px;
            text-align: center;
            color: #fff;
            background-image: url("../../assets/images/bg-activity-ing.png");
            background-size: contain;
        }
        .item{
            display: flex;
            margin-top: 6px;
            .text{
                line-height: 1.5rem;
            }
        }
        .showBtn{
            width: 80px;
            height: 24px;
            margin-top: 12px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            background-image: linear-gradient(-180deg, #56AEEA 0%, #81D2F8 98%);
            box-shadow: 0 2px 6px 0 #97CAE9;
        }
    }
</style>
<template>
    <div>
        <div :class="$style.content" v-if="!loading">
            <div :class="$style.info">
                <ImgContain :class="$style.cover" :imgUrl="dataInfo.info.cover_file"></ImgContain>
                <div :class="$style.desc">
                    <span :class="[$style.ing,'size-topic']">活动进行中</span>
                    <h3 class="topic">{{dataInfo.info.theme}}</h3>
                    <div :class="$style.item">
                        <div class="itemDfn"><span>活动时间：</span></div>
                        <div class="itemTxt"><span>{{dataInfo.info.time | dateFormat('M月dd日 hh:mm')}} - {{dataInfo.info.end_time | dateFormat('M月dd日 hh:mm')}}</span></div>
                    </div>
                    <div :class="$style.item">
                        <div class="itemDfn"><span>活动地址：</span></div>
                        <div class="itemTxt"><span>{{dataInfo.info.place}}</span></div>
                    </div>
                    <div :class="$style.item">
                        <div class="itemDfn"><span>联系方式：</span></div>
                        <div class="itemTxt"><span class="color-topic">{{dataInfo.info.contact}}</span></div>
                    </div>
                    <div :class="$style.item">
                        <div class="itemDfn"><span>活动费用：</span></div>
                        <div class="itemTxt"><span v-if="dataInfo.info.fee">¥{{dataInfo.info.fee}}／人</span><span v-else>免费</span></div>
                    </div>
                    <div :class="$style.item">
                        <div class="itemDfn"><span>限定人数：</span></div>
                        <div class="itemTxt"><span>{{dataInfo.info.amount}}</span></div>
                    </div>
                    <div :class="$style.item">
                        <div :class="$style.text">
                            <span>活动说明：</span><span>{{dataInfo.info.description}}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span :class="[$style.showBtn,'inline-block']">精彩活动秀</span>
                    </div>
                </div>
            </div>
            <div :class="['list-content',$style.info,$style.attendedList]">
                <h3 class="item-header">报名名单</h3>
                <ul>
                    <attendedItem :dataInfo="dataInfo.creator" :isAuthor="true" @cancelExchange="cancelExchange" @exchange="exchange"></attendedItem>
                    <attendedItem v-for="item in dataInfo.attendedCrowd" :key="item.uid" :dataInfo="item" @cancelExchange="cancelExchange" @exchange="exchange"></attendedItem>
                </ul>
            </div>
            <div :class="['list-content',$style.info,$style.commentList]">
                <h3 class="item-header">校友评论</h3>
                <ul>
                    <commentItem v-for="comment in dataInfo.comments" :dataInfo="comment" :key="comment.uid" @removeComment="removeComment"></commentItem>
                </ul>
            </div>
            <operateBar :dataInfo="operateBarData" @click="operateBarClick"></operateBar>
        </div>
        <Loading v-else></Loading>
    </div>
</template>
<script>
    import $api from 'api';
    import operateBar from  '../public/operateBar.vue'
    import attendedItem from './attendedItem.vue'
    import commentItem from './commentItem.vue'
    export default {
        created(){
            this.getData(this.$route.params);
        },
        components:{
          attendedItem,
          commentItem,
          operateBar
        },
        data(){
          return {
            operateBarData:{
              leftText:'报名预定',
              rightText:'评论',
              rightImage: require('../../assets/images/icon-comment.png')
            },
            loading: true,
            dataInfo:{}
          }
        },
        methods: {
          operateBarClick(type){
            console.log(type)
          },
          getData({id}){
            this.loading = true;
            $api.get('/index.php/Activity/getDetail',{aid:id })
              .then(res=>{
                this.dataInfo = res;
                this.loading = false;
              },err=>{
                this.$toast({message: err});
                this.loading = false;
              })
          },
          exchange(item){
            var {uid} = item;
            $api.post('/index.php/Profile/requestExchange',{uid})
              .then(res => {
              this.$toast(res.msg);
            },res=>{
              this.$toast('服务器异常')
            })
          },
          cancelExchange(item){
            var {uid} = item;
            $api.post('/index.php/Profile/cancelExchange',{uid})
              .then(res => {
              if(res.result) {
                this.$toast(res.msg)
              }
            },res=>{
              this.$toast('服务器异常')
            })
          },
          removeComment(item){
            console.log(item);
          }
        }
    }
</script>