<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-bottom: 40px;
    }
    .cover{
        width:100%;
    }
    .coverFile{
        height: 170px;
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
                /*display: flex;*/
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
                <ImgContain :class="[$style.cover,$style.coverFile]" :imgUrl="dataInfo.info.cover_file"></ImgContain>
                <div :class="$style.desc">
                    <span :class="[$style.ing,'size-topic']" v-if="dataInfo.info.ongoing">活动进行中</span>
                    <h3 class="topic">{{dataInfo.info.theme}}</h3>
                    <div :class="$style.item">
                        <div class="itemDfn"><span>活动时间：</span></div>
                        <div class="itemTxt" v-if="dataInfo.info.time != '0'"><span>{{dataInfo.info.time | dateFormat('M月dd日 HH:mm')}} - {{dataInfo.info.end_time | dateFormat('M月dd日 HH:mm')}}</span></div>
                        <div class="itemTxt" v-else><span>不限制</span></div>
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
                        <div class="itemTxt"><span>{{dataInfo.info.amount == '0' ? '不限制' : dataInfo.info.amount}}</span></div>
                    </div>
                    <div :class="$style.item">
                        <div :class="$style.text">
                            <div>活动说明：</div><div v-transform="dataInfo.info.description"></div>
                        </div>
                    </div>
                    <div class="text-right">
                        <span :class="[$style.showBtn,'inline-block']" @click="showPhotos">精彩活动秀</span>
                    </div>
                </div>
                <div v-if="dataInfo.pictures && dataInfo.pictures.length > 0">
                    <ImgContain :class="$style.cover" :imgUrl="url" :onlyImage="true" v-for="(url,index) in dataInfo.pictures"></ImgContain>
                </div>
            </div>
            <div :class="['list-content',$style.info,$style.attendedList]">
                <h3 class="item-header">报名名单</h3>
                <ul>
                    <attendedItem :dataInfo="dataInfo.creator" :isAuthor="true" ></attendedItem>
                    <attendedItem v-for="item in dataInfo.attendedCrowd" :key="item.uid" :dataInfo="item" :showInfo="isCreater"></attendedItem>
                </ul>
            </div>
            <div :class="['list-content',$style.info,$style.commentList]" v-if="dataInfo.comments.length">
                <h3 class="item-header">校友评论</h3>
                <ul>
                    <commentItem v-for="(comment ,index) in dataInfo.comments" :dataInfo="comment" :key="index" :showRemove="showRemove(comment)" @removeComment="removeComment"></commentItem>
                </ul>
            </div>
            <operateBar :dataInfo="operateBarData" @click="operateBarClick"></operateBar>
        </div>
        <Loading v-else></Loading>
    </div>
</template>
<script>
    import $api from 'api';
    import {mapState} from 'vuex';
    import operateBar from  '../public/operateBar.vue'
    import attendedItem from './attendedItem.vue'
    import commentItem from './commentItem.vue'
    import Pay from '../../components/payDialog'
    import Util from '../../util'
    import {register,wechatShare,wechatPay} from '../../util/wechat-api'
    export default {
        created(){
            register(window.location.href);
            this.getData(this.$route.query);
//            this.getData(this.$route.params);
        },
        components:{
          attendedItem,
          commentItem,
          operateBar
        },
        data(){
          return {
            loading: true,
            showPayDialog: false,
            dataInfo:{}
          }
        },
        computed:{
          ...mapState({
            self:(state)=>state.user.profile
          }),
          isCreater(){
            if(this.loading){
              return false;
            }else{
              return this.self.uid == this.dataInfo.creator.uid;
            }
          },
          operateBarData(){
            var obj = {
              leftText:'马上报名',
              rightText:'评论',
              rightImage: require('../../assets/images/icon-comment.png')
            };
            if(this.dataInfo.attended){
              obj.leftText = '取消报名';
                obj.hint = true;
            }
            return obj;
          }
        },
        beforeRouteLeave(to,from,next){
            wechatShare({});
            next();
        },
        methods: {
            payApply(){
//              {amount:this.dataInfo.info.fee * 100,product:this.dataInfo.info.theme}
                $api.get('/Pay/newOrder',{amount:this.dataInfo.info.fee * 100,product:this.dataInfo.info.theme})
                        .then(data=>{
                            wechatPay({
                                data,
                                success:()=>{
                                    $api.post('/Activity/join',{aid:this.dataInfo.info.aid})
                                    .then(res=>{
                                        this.$toast(res.msg);
                                        if(res.result){
                                            this.dataInfo.attended = true;
                                            this.dataInfo.attendedCrowd.push(this.self);
                                        }
                                    },err=>{
                                        this.$toast('服务器异常');
                                    });
                                },
                                error:()=>{
                                    this.$toast('支付失败');
                                }
                            });
                        },error=>{
                            console.log(error);
                        })
            },
            payCancel(){
                this.showPayDialog = false;
            },
          showRemove(comment){
            return this.self.uid == this.dataInfo.creator.uid || this.self.uid == comment.uid;
          },
          operateBarClick(type){
              Util.isAuthored('你还没有完善个人信息,马上去完善?')
                      .then(()=>{
                  if(type == 'left'){
                  if(!this.dataInfo.attended) {
                      if(this.dataInfo.finished == '1'){
                          this.$toast('活动已经结束了');
                          return false;
                      }
                      if(this.isCreater){
                          this.$toast('不能报名自己的活动');
                          return false;
                      }
                      if(this.dataInfo.info.fee != '0.00'){
                          Pay.showApply({
                                      money: this.dataInfo.info.fee,
                                      ok:()=>{
                                      this.payApply();
                      },
                          cancel:()=>{
                              console.log('cancel')
                          }
                      })
                      }else{
                          $api.post('/Activity/join',{aid:this.dataInfo.info.aid})
                                  .then(res=>{
                              this.$toast(res.msg);
                          if(res.result){
                              this.dataInfo.attended = true;
                              this.dataInfo.attendedCrowd.push(this.self);
                          }
                      },err=>{
                              this.$toast('服务器异常');
                          })
                      }
                  }else{
                      Pay.showCancel({
                                  money: this.dataInfo.info.fee,
                                  ok:()=>{
                                        $api.post('/Activity/cancelAttend',{aid:this.dataInfo.info.aid})
                                        .then(res=>{
                                              this.$toast(res.msg);
                                              if(res.result){
                                                  this.dataInfo.attended = false;
                                                  this.dataInfo.attendedCrowd = this.dataInfo.attendedCrowd.filter(user => user.uid != this.self.uid);
                                              }
                                        },err=>{
                                          this.$toast('服务器异常');
                                        })
                                  },
                                  cancel:()=>{
                                      console.log('cancel')
                                  }
                      })
                  }
              }else{
                  this.$router.push({
                      path: '/comment/activity',
                      query:{aid: this.dataInfo.info.aid}
                  });
              }
              },null);

          },
          showPhotos(){
              const {id} = this.$route.query;
              this.$router.push(`/activity/photos/${id}`);
           },
          getData({id}){
            this.loading = true;
            $api.get('/Activity/getDetail',{aid:id })
              .then(res=>{
                this.dataInfo = res;
                this.loading = false;
                this.initialShare();
              },err=>{
                this.$toast({message: err});
                this.loading = false;
              })
          },
          initialShare(){
              let info = this.dataInfo;
              wechatShare({
                  title:info.theme,
                  link: window.location.href,
                  imgUrl: info.cover_file,
                  desc: info.description
              });
          },
          removeComment(item){
            $api.post('/Picture/deleteComment',{cid:item.cid})
              .then(res=>{
                this.$toast(res.msg);
                if(res.result) {
                  this.dataInfo.comments = this.dataInfo.comments.filter(obj=>{
                    if(obj.cid == item.cid){
                      return false;
                    }
                    return true;
                  });
                }
              },err=>{
                this.$toast('服务器异常')
              })
          }
        }
    }
</script>