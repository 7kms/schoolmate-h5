<style lang="less" module>
    p{
        margin:0;
        padding: 0;
    }
    .content{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    .card{
        position: relative;
        width: 95%;
        min-width: 320px;
        max-width: 350px;
        height: 200px;
        margin-bottom: 20px;
        background: #FFFFFF;
        box-shadow: 0 2px 5px 0 rgba(211,211,211,0.43);
        border-radius: 9px;
    }
    .title{
        height: 35px;
        padding: 0 18px 0 9px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .split{
        height: 4px;
        background-image: linear-gradient(-161deg, #672A24 0%, #C8AE80 100%);
    }
    .boxPositive{
        display: flex;
        flex-direction: row;
        padding:32px 8px 0 16px;
        .list{
            position: relative;
            margin-left: 21px;
            z-index: 1;
            .item{
               margin-bottom: 14px;
            }
        }
        .info{
            flex: 1;
            position: relative;
        }
        .schoolLogo{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .boxNegative{
        position: relative;
        z-index: 1;
        padding: 7px 12px 0;
        line-height: 19px;
    }
    .cardLogo2{
        margin: 2px 0 0 2px;
    }
    .qrCode{
        position: absolute;
        right: 2px;
        bottom: 0;
    }
</style>
<template>
    <div :class="$style.content">
        <Loading v-if="loading"></Loading>
        <div :class="$style.card">
            <div :class="[$style.title,'color-topic']">
                <div class="cardLogo">
                    <img src="../../assets/images/card-logo.png" width="128" alt="">
                </div>
                <div class="number">
                    <span>编号：</span><span>{{profile.uid}}</span>
                </div>
            </div>
            <div :class="$style.split"></div>
            <div :class="$style.boxPositive">
                <div :class="$style.pic">
                    <img v-if="!profile.photo" src="../../assets/images/card-header.png" alt="" width="60" height="60">
                    <imgContain v-else :imgUrl="profile.photo" :onlyImage="true" style="width:60px ;height:60px"></imgContain>
                </div>
                <div :class="$style.info">
                    <ul :class="$style.list">
                        <li :class="$style.item">
                            <span>姓 名：</span><span>{{profile.name}}</span>
                        </li>
                        <li :class="$style.item">
                            <span>性 别：</span><span>{{profile.gender}}</span>
                        </li>
                        <!--<li :class="$style.item">-->
                            <!--<span>民 族：</span><span>美国</span>-->
                        <!--</li>-->
                        <li :class="$style.item">
                            <span>专 业：</span><span>{{profile.major}}</span>
                        </li>
                        <li :class="$style.item">
                            <span>毕业日期：</span><span>{{graduateTime}}</span>
                        </li>
                    </ul>
                    <div :class="$style.schoolLogo">
                        <img src="../../assets/images/card-school.png" width="112" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.card">
            <div :class="[$style.title,'color-topic']">
                <div>使用须知</div>
                <div class="number">http://xyh.hgu.edu.cn</div>
            </div>
            <div :class="$style.split"></div>
            <div :class="$style.boxNegative">
                <p>1.此卡仅限本人使用，转借他人无效。</p>
                <p>2.校友卡可作为出入校园、参加学校有关活动的凭证。</p>
                <p>3.凭校友卡可免费参观地球科学博物馆。<br/>
                    &nbsp;&nbsp;(开馆时间 9:00-17:00,周一，周四闭馆)</p>
                <p>4.凭借校友卡可听取学校各类学术报告会。</p>
                <p>5.凭借校友卡入住学校宾馆可享受优惠折扣。</p>
            </div>
            <div :class="$style.cardLogo2">
                <img src="../../assets/images/card-logo-2.png" width="165" alt="">
            </div>
            <div :class="$style.qrCode">
                <img src="../../assets/images/card-qr-code.png" width="118" alt="">
            </div>
        </div>
    </div>
</template>
<script>
  import $api from  'api';
  import { mapState } from 'vuex';
  export default {
    data(){
      return {
        loading: false
      }
    },
    computed: {
      graduateTime(){
        let str = this.profile.graduate_time ? this.profile.graduate_time.slice(0,4) : '';
        if(str){
          str += '.07.01';
        }
        return str;
      },
      ...mapState({
        profile: (state) => state.user.profile
      })
    }
  }
</script>